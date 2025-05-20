import { HttpContext } from '@adonisjs/core/http'
import { log } from 'console'
import NodeCache from 'node-cache'

const cache = new NodeCache()
const CACHE_CONTROL_HEADER = 'cache-control'

export default class CacheMiddleware {
  /**
   * Handle incoming HTTP requests.
   */
  public async handle(
    { request, response }: HttpContext,
    next: () => Promise<void>,
    { ttl }: { ttl?: number } // Optional TTL in seconds
  ) {
    const cacheKey = `route:${request.method()}:${request.url()}`

    // Check if the response is cached
    const cachedResponse = cache.get(cacheKey)
    if (cachedResponse) {
      const { body, headers, statusCode } = cachedResponse
      response.status(statusCode).send(body)
      return
    }

    // Continue to the next middleware/route handler
    await next()

    // Cache the response if it's a successful GET request and not already cached
    if (request.method() === 'GET' && response.getStatus() >= 200 && response.getStatus() < 300 && !cache.has(cacheKey)) {
      const responseBody = response.getBody()
      const responseHeaders = response.getHeaders()
      const statusCode = response.getStatus()

      // Only cache if the Cache-Control header doesn't explicitly prevent it
      if (!responseHeaders[CACHE_CONTROL_HEADER]?.includes('no-store')) {
        cache.set(
          cacheKey,
          { body: responseBody, headers: responseHeaders, statusCode },
          ttl // Use the middleware-specific TTL if provided, otherwise default to node-cache's default
        )
      }
    }
  }
}
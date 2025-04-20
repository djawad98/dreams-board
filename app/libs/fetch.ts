
export default async function apiFetch<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
    const response = await fetch(
      url,
      {
        ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
          }
      }
    );
    return response.json() as T;
  
}

export default async function apiFetch<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  try {
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
  } catch (e) {
    console.error(url,e);
    throw new Error(JSON.stringify(url))
  }
}
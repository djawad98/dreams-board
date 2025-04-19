export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^09(\d{9})$/;
export const farsiNumbersRegex = /\b(?![۰-۹٠-٩])\d+\b/;
export const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/;

export function toQueryParam(input: Record<string, unknown> | object): string {
  const normalizedInput = Object.entries(input).map(([key, value]) => [
    key,
    value?.toString() || '',
  ]);
  return new URLSearchParams(normalizedInput).toString();
}

export function thousandSeparator(
  number: string | number,
  separator = ',',
): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

export function toTimecode(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return [
    hrs > 0 ? String(hrs).padStart(2, '0') : null, // Include hours only if needed
    String(mins).padStart(2, '0'),
    String(secs).padStart(2, '0'),
  ]
    .filter(Boolean) // Remove null values
    .join(':');
}

export function extractKeyFromCookie(
  cookieString: string,
  key: string,
): string | null {
  const cookiePairs = cookieString.split(';');
  for (const pair of cookiePairs) {
    const [name, value] = pair.trim().split('=');
    if (name === key) {
      return value;
    }
  }
  return null;
}

export function isValidJSON(str: string) {
  try {
    const parsed = JSON.parse(str);
    // Optionally check for object or array
    return typeof parsed === 'object' && parsed !== null;
  } catch (e) {
    return false;
  }
}

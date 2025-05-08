// lib/utils/cookieUtils.ts

/**
 * Safely get a cookie value in both client and server environments
 * @param name The name of the cookie to retrieve
 * @returns The cookie value if found, undefined otherwise
 */
export const getCookie = (name: string): string | undefined => {
  // Check if code is running in a browser environment
  if (typeof window === "undefined" || typeof document === "undefined") {
    return undefined;
  }

  // Get all cookies
  const cookies = document.cookie.split(";");

  // Find the cookie with the specified name
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    // Check if this cookie starts with the name we want
    if (cookie.startsWith(name + "=")) {
      // Return the cookie value
      return cookie.substring(name.length + 1);
    }
  }

  // Cookie not found
  return undefined;
};

/**
 * Safely get the auth token from cookies
 * @returns The authentication token if found, undefined otherwise
 */
export const getAuthToken = (): string | undefined => {
  return getCookie("token");
};

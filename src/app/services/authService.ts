import axios from 'axios';

const API_URL: string = 'https://api.brandsquare.store/api/auth';

// Function to get the JWT token from cookies or localStorage
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  return (
    localStorage.getItem('token') ||
    document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1] ||
    null
  );
};

// Function to validate if the JWT token is still valid
export const validateToken = async (): Promise<boolean> => {
  const token = getToken();
  
  if (!token) return false;
  
  try {
    // Make a request to a protected endpoint to validate the token
    // Using the /categories endpoint as it should be protected and lightweight
    const response = await axios.get(`${API_URL.replace('/auth', '')}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    // If we get a successful response, the token is valid
    return response.status === 200;
  } catch (error: unknown) {
    // If we get a 401 or 403 error, the token is invalid or expired
    const err = error as { response?: { status: number } };
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      console.log('Token expired or invalid');
      // Clear invalid token from storage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
      }
    }
    console.error('Token validation error:', err);
    return false;
  }
};

// Function to check if the user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  const token = getToken();
  
  if (!token) return false;
  
  try {
    return await validateToken();
  } catch (error) {
    console.log(error)
    return false;
  }
};
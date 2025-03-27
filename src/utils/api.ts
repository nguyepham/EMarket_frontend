import { ErrorResponse } from "react-router";

export async function apiRequest<T>(
  endpoint: string,
  isAuthRequired: boolean = true,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
  const token = localStorage.getItem("jwt"); // Retrieve JWT token from localStorage

  if (isAuthRequired && !token) {
    console.warn("API request prevented: Unauthorized (No token)");
    return Promise.reject({
      statusText: "Unauthorized",
      status: 401,
    } as ErrorResponse);
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers: { ...headers, ...options.headers },
    })
    console.log('This is from apiRequest:\nres\'s content length: ', res.headers.get('content-length'), '\nres\'s content type: ', res.headers.get('content-type'), '\nres\'s status: ', res.status);
    if (res.status >= 400) {
      const errorData = await res.json()
      console.error('API request failed:', errorData.message)
      throw {
        status: errorData.httpStatus || res.status,
        statusText: errorData.message || 'Request failed',
      } as ErrorResponse
    }

    return await res.json() as T
        
  } catch (err: any) {
    console.error('API request failed:', (err as ErrorResponse).statusText || err.message)
    if (err.status && err.statusText) {
      console.log('err already in ErrorResponse format')
      // Already in ErrorResponse format
      throw err
    }
    throw {
      status: err.status || 500,
      statusText: err.message || 'Request failed',
    } as ErrorResponse
  }
}

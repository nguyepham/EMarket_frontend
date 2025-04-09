import { ErrorResponse } from "react-router"

export async function apiRequest<T>(
  endpoint: string,
  isAuthRequired: boolean = true,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || ""
  const token = localStorage.getItem("jwt") // Retrieve JWT token from localStorage

  if (isAuthRequired && !token) {
    return Promise.reject({
      statusText: "Unauthorized",
      status: 401,
    } as ErrorResponse)
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers: { ...headers, ...options.headers },
    })

    return await res.json() as T
        
  } catch (err: any) {
    if (err.status && err.statusText) {
      throw err
    }
    let statusText
    if (err.message.includes('NetworkError')) {
      statusText = 'Không thể kết nối đến máy chủ'
    } else {
      statusText =  err.message || 'Request failed'
    }
    throw {
      status: err.status || 500,
      statusText: statusText
    } as ErrorResponse
  }
}

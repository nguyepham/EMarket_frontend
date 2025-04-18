import { ErrorResponse, redirect } from 'react-router'
import { API_BASE_URL } from '../constants'

export async function apiRequest<T>(
  endpoint: string,
  isAuthRequired: boolean = true,
  isFormData: boolean = false, // true if uploading files
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = API_BASE_URL
  const token = localStorage.getItem('jwt')

  if (isAuthRequired && !token) {
    console.warn('Token not found, redirecting to login')
    throw redirect('/auth/login')
  }

  const headers: HeadersInit = {
    ...(isAuthRequired && token ? { Authorization: `Bearer ${token}` } : {}),
  }

  // Add 'Content-Type' only if it's not FormData (browser sets it with correct boundary)
  if (!isFormData) {
    headers['Content-Type'] = 'application/json'
  }

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers: { ...headers, ...options.headers },
    })

    console.log('API request: ', {
      url: `${baseUrl}${endpoint}`,
      method: options.method,
      headers: headers,
      body: options.body,
    })

    const res = await response.json()

    console.log('API response: ', res)

    const contentType = response.headers.get('content-type')
    const isJSON = contentType?.includes('json')

    const payload = isJSON ? res : await response.text()

    if (isJSON && payload?.error?.includes('InvalidJwtException')) {
      localStorage.removeItem('jwt')
      localStorage.removeItem('username')
      window.dispatchEvent(new Event('localStorageChange'))

      console.warn('Token expired, redirecting to login')
      throw redirect('/auth/login')
    }

    return payload as T
  } catch (err: any) {
    console.error('API request error: ', err) 
    if (err.status && err.statusText) {
      throw err
    }

    let statusText = 'Lỗi không xác định'
    if (err.message?.includes('NetworkError')) {
      statusText = 'Không thể kết nối đến máy chủ'
    } else if (err.statusText) {
      statusText = err.statusText
    }

    throw {
      status: err.status || 500,
      statusText,
    } as ErrorResponse
  }
}

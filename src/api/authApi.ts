// src/api/authApi.ts

import { ENDPOINTS } from '../constants'
import { LoginRequest, SignUpRequest, ErrorResponse } from '../types/api'

export const login = async (credentials: LoginRequest): Promise<string> => {
  try {
    const res = await fetch(import.meta.env.VITE_API_BASE_URL + ENDPOINTS.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw {
        message: errorData.message || 'Login failed',
        httpStatus: res.status,
      } as ErrorResponse
    }

    return await res.text()
    
  } catch (err: any) {
    if (err.message && err.httpStatus) {
      // Already in ErrorResponse format
      throw err
    }
    throw {
      message: 'Unable to connect to server.',
      httpStatus: 0,
    } as ErrorResponse
  }
}

export const signUp = async (data: SignUpRequest): Promise<void> => {
  try {
    const res = await fetch(import.meta.env.VITE_API_BASE_URL + ENDPOINTS.SIGN_UP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw {
        message: errorData.message || 'Sign-up failed',
        httpStatus: res.status,
      } as ErrorResponse
    }

    // success: nothing to return
  } catch (err: any) {
    if (err.message && err.httpStatus) {
      throw err
    }
    throw {
      message: 'Unable to connect to server.',
      httpStatus: 0,
    } as ErrorResponse
  }
}

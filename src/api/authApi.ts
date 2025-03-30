// src/api/authApi.ts

import { ErrorResponse } from 'react-router'
import { ENDPOINTS } from '../constants'
import { LoginRequest, SignUpRequest } from '../types/api'

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
      console.log('Error data from login:', errorData)
      throw {
        statusText: errorData.message || 'Login failed',
        status: res.status,
      } as ErrorResponse
    }

    return await res.text()
    
  } catch (err: any) {
    if (err.status && err.statusText) {
      // Already in ErrorResponse format
      throw err
    }
    throw {
      statusText: 'Unable to connect to server.',
      status: 0,
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
        statusText: errorData.message || 'Sign-up failed',
        status: res.status,
      } as ErrorResponse
    }

    // success: nothing to return
  } catch (err: any) {
    if (err.status && err.statusText) {
      throw err
    }
    throw {
      statusText: 'Unable to connect to server.',
      status: 0,
    } as ErrorResponse
  }
}

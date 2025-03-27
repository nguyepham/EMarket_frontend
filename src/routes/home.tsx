import bcrypt from "bcryptjs"
import { ENDPOINTS } from "../constants"

export async function homeLoader(): Promise<string> {
  console.log('customer1N: ', await bcrypt.hash('customer1N', 12))
  console.log('merchant1N: ', await bcrypt.hash('merchant1N', 12))
  console.log('admin1N: ', await bcrypt.hash('admin1N', 12))
  const token = localStorage.getItem('jwt')

  const res = await fetch(import.meta.env.VITE_API_BASE_URL + ENDPOINTS.HOME, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!res.ok) {
    if (res.status === 401) {
      throw new Response('Unauthorized', { status: 401 })
    }
    if (res.status === 404) {
      throw new Response('Not Found', { status: 404 })
    }
    throw new Response('Something went wrong', { status: res.status })
  }
  return await res.text()
}
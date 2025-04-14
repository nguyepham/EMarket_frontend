import bcrypt from 'bcryptjs'

export async function homeLoader(): Promise<string> {
  console.log('customerN1: ', await bcrypt.hash('customerN1', 12))
  console.log('merchantN1: ', await bcrypt.hash('merchantN1', 12))
  console.log('adminN1: ', await bcrypt.hash('adminN1', 12))
  const token = localStorage.getItem('jwt')

  const res = await fetch(import.meta.env.VITE_API_BASE_URL + 'home', {
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
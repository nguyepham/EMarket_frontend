// src/pages/UnauthorizedPage.tsx
import { Link } from 'react-router'

export default function UnauthorizedPage() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-white px-4'>
      <h1 className='text-5xl font-bold text-yellow-500'>401</h1>
      <p className='text-xl mt-4 text-gray-700'>Unauthorized Access</p>
      <p className='text-sm text-gray-500 mt-2'>
        You must be logged in to view this page.
      </p>
      <Link
        to='/auth/login'
        className='mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
      >
        Go to Login
      </Link>
    </div>
  )
}

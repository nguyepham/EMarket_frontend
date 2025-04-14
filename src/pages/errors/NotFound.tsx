import { Link } from 'react-router'

export default function NotFound() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-white px-4'>
      <h1 className='text-6xl font-bold text-red-500'>404</h1>
      <p className='text-xl mt-4 text-gray-700'>Oops! Page not found.</p>
      <p className='text-sm text-gray-500 mt-2'>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to='/'
        className='mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
      >
        Back to Home
      </Link>
    </div>
  )
}

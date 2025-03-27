import { Link, useLoaderData } from 'react-router'
import LogoutButton from '../components/LogoutButton'

export default function Home() {
  const welcomeMessage = useLoaderData() as string

  return (
    <div className="p-4 text-xl">
    <nav className="space-x-4">
      <Link to="/home" className="hover:text-blue-500 font-medium">
        Home
      </Link>
      <Link to="/auth/login" className="hover:text-blue-500 font-medium">
        Login
      </Link>
      <Link to="/auth/sign-up" className="hover:text-blue-500 font-medium">
        Sign Up
      </Link>
    </nav>
      {welcomeMessage}
      <LogoutButton />
    </div>
  )
}

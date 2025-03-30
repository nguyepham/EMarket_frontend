import { Link, useLoaderData } from 'react-router'
import LogoutButton from '../components/LogoutButton'

export default function Home() {
  const welcomeMessage = useLoaderData() as string

  return (
    <div className="p-4 text-xl">
      {welcomeMessage}
    </div>
  )
}

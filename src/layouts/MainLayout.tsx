import { Link, Outlet } from 'react-router'

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            eMarket
          </Link>
          <nav className="space-x-4">
            <Link to="/auth/login" className="hover:text-blue-500 font-medium">
              Login
            </Link>
            <Link to="/auth/sign-up" className="hover:text-blue-500 font-medium">
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} eMarket. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default MainLayout

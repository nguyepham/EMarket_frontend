import { Heading, majorScale, minorScale, Pane, SearchInput, Text } from 'evergreen-ui'
import { Outlet } from 'react-router'
import { useEffect, useState } from 'react'
import AuthPanel from '../components/AuthPanel'
import HomePanel from '../components/HomePanel'
import { COLOR } from '../constants'

export default function RootLayout() {
  const [username, setUsername] = useState(localStorage.getItem('username'))

  useEffect(() => {
    const handleStorageChange = () => {
      setUsername(localStorage.getItem('username'))
    }

    // Listen for custom events or storage changes
    window.addEventListener('localStorageChange', handleStorageChange)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('localStorageChange', handleStorageChange)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])
  
  return (
    <Pane display='flex' flexDirection='column' gap={majorScale(2)} minHeight='100vh' borderTopLeftRadius={minorScale(1)} borderTopRightRadius={minorScale(1)}>
      {/* Navigation */}
      {username ? (
        <HomePanel username={username} />
      ) : (
        <AuthPanel />
      )}

      {/* Header */}
      <Pane display='flex' justifyContent='space-between' alignItems='space-between' height='5vh' padding={majorScale(1)}>
        <Heading size={800}>EMarket</Heading>
        <SearchInput placeholder="Filter traits..." />
      </Pane>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <Pane display='flex' justifyContent='center' alignItems='center' height='4vh' backgroundColor={COLOR.PRIMARY} >
        <Text padding={majorScale(2)}>
          &copy; {new Date().getFullYear()} EMarket. All rights reserved.
        </Text>
      </Pane>
    </Pane>
  )
}
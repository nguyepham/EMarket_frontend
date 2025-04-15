import { Avatar, Heading, majorScale, minorScale, Pane, SearchInput, Text } from 'evergreen-ui'
import { Outlet } from 'react-router'
import { use, useEffect, useRef, useState } from 'react'
import AuthPanel from '../components/AuthPanel'
import HomePanel from '../components/HomePanel'
import { API_BASE_URL, COLOR } from '../constants'
import Sidebar from '../components/Sidebar'
import AccountMenu from '../components/AccountMenu'
import { CustomAvatar } from '../components/CustomAvatar'
import { apiRequest } from '../utils/api'
import { User } from '../types/model'

export default function RootLayout() {
  const [username, setUsername] = useState(localStorage.getItem('username'))
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [avatarUrl, setAvatarUrl] = useState(localStorage.getItem('avatarUrl'))

  console.log('avatarUrl from root layout: ', avatarUrl)
  console.log('username from root layout: ', username)
  console.log('localStorage username: ', localStorage.getItem('username'))
  console.log('localStorage avatarUrl: ', localStorage.getItem('avatarUrl'))

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSidebarOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setIsSidebarOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSidebarOpen])

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    // Clean up on unmount just in case
    return () => {
      document.body.style.overflow = ''
    }
  }, [isSidebarOpen])

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  // console.log('avatarUrl from root layout: ', avatarUrl)

  return (
    // <AvatarContext.Provider value={{ avatarUrl, setAvatarUrl }}>
    <Pane position='relative'>
      {/* Overlay */}
      {isSidebarOpen && (
        <Pane
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          background="rgba(0, 0, 0, 0.4)"
          zIndex={40}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Account sidebar */}
      {username &&
        <Sidebar isOpen={isSidebarOpen} sidebarRef={sidebarRef} username={username!}>
          <>
            <Pane
              background={COLOR.PRIMARY}
              padding={majorScale(1)}
              height='6vh'
              display='flex'
              flexDirection='row-reverse'
              gap={majorScale(1)}
              alignItems='center'>
              <CustomAvatar username={username!} avatarUrl={avatarUrl} onClick={handleSidebarToggle} />
              <Text
                fontSize={majorScale(2)}
                color={COLOR.TEXT_DARK}
                fontWeight={500}
                padding={majorScale(1)}
                display='flex'
                alignItems='center'
                gap={minorScale(1)}
              >
                {username}
              </Text>
            </Pane>
            <AccountMenu username={username!} setUsername={setUsername} closeSidebar={handleSidebarToggle} />
          </>
        </Sidebar>
      }
      <Pane display='flex' flexDirection='column' gap={majorScale(2)} minHeight='100vh' borderTopLeftRadius={minorScale(1)} borderTopRightRadius={minorScale(1)}>
        {/* Navigation */}
        {username ? (
          <HomePanel username={username} avatarUrl={avatarUrl} toggleSidebar={() => setIsSidebarOpen(true)} />
        ) : (
          <AuthPanel />
        )}

        {/* Header */}
        <Pane display='flex' justifyContent='space-between' alignItems='space-between' height='5vh' padding={majorScale(1)}>
          <Heading size={800}>EMarket</Heading>
          <SearchInput placeholder='Filter traits...' />
        </Pane>

        {/* Main content */}
        <main className='flex-grow container mx-auto px-4 py-6'>
          <Outlet context={{ setUsername, setAvatarUrl }} />
        </main>

        {/* Footer */}
        <Pane display='flex' justifyContent='center' alignItems='center' height='6vh' backgroundColor={COLOR.PRIMARY} >
          <Text
            fontSize={majorScale(2)}
            color={COLOR.TEXT_DARK}
            fontWeight={500}
            padding={majorScale(1)}
            display='flex'
            alignItems='center'
            gap={minorScale(1)}
          >
            &copy; {new Date().getFullYear()} EMarket. All rights reserved.
          </Text>
        </Pane>
      </Pane>
    </Pane>
    // </AvatarContext.Provider>
  )
}
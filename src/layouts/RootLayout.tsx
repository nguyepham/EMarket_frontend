import { Heading, majorScale, Pane, SearchInput, Text } from 'evergreen-ui'
import { Outlet } from 'react-router'
import HomePanel from './HomePanel';
import AuthPanel from './AuthPanel';
import { useEffect, useState } from 'react';

export default function RootLayout() {
  const [username, setUsername] = useState(localStorage.getItem('username'));

  useEffect(() => {
    const handleStorageChange = () => {
      setUsername(localStorage.getItem('username'));
    };

    // Listen for custom events or storage changes
    window.addEventListener('localStorageChange', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('localStorageChange', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  return (
    <Pane display='flex' flexDirection='column' gap={majorScale(2)} minHeight='100vh' background='gray90'>
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
      <Pane display='flex' justifyContent='center' alignItems='center' height='4vh' background='yellowTint'>
        <Text padding={majorScale(2)}>
          &copy; {new Date().getFullYear()} EMarket. All rights reserved.
        </Text>
      </Pane>
    </Pane>
  );
}
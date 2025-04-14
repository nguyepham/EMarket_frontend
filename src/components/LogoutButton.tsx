import { useNavigate } from 'react-router'
import { Button, majorScale } from 'evergreen-ui'
import { COLOR } from '../constants'

export default function LogoutButton({ closeSidebar, setUsername }: { 
  closeSidebar: () => void
  setUsername: (username: string | null) => void
}) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('username')
    setUsername(null)
    closeSidebar()

    navigate('/', { replace: true })
  }

  return (
    <Button
      appearance='minimal'
      onClick={handleLogout}
      padding={majorScale(1)}
      color={COLOR.TEXT_DARK}
      fontSize={majorScale(2)}
      width='100%'
      style={{ justifyContent: 'flex-end' }}
    >
      <span style={{ marginRight: majorScale(2) }}>Đăng xuất</span>
    </Button>
  )
}

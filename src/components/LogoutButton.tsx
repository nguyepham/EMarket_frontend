import { useNavigate } from 'react-router'
import { Button, majorScale } from 'evergreen-ui'
import { COLOR } from '../constants'
import CustomButton from './CustomButton'

export default function LogoutButton({ closeSidebar, setUsername, setAvatarUrl }: {
  closeSidebar: () => void
  setUsername: (username: string | null) => void
  setAvatarUrl: (avatarUrl: string | null) => void
}) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('username')
    localStorage.removeItem('avatarUrl')
    setUsername(null)
    setAvatarUrl(null)
    closeSidebar()

    navigate('/', { replace: true })
  }

  return (
    <CustomButton
      text='Đăng xuất'
      width='100%'
      padding='0'
      justifyContent='flex-end'
      backgroundColor={{
        DEFAULT: COLOR.PRIMARY,
        DARK: COLOR.PRIMARY_DARK,
        LIGHT: COLOR.PRIMARY_LIGHT,
      }}
      onClick={handleLogout}>
    </CustomButton>
  )
}

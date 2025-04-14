import { Avatar, majorScale, minorScale, Pane } from 'evergreen-ui'
import { Link as RouterLink } from 'react-router'
import LogoutButton from '../components/LogoutButton'
import { API_BASE_URL, COLOR } from '../constants'
import { CustomAvatar } from './CustomAvatar';

export default function HomePanel({ username, avatarUrl, toggleSidebar }: { 
  username: string
  avatarUrl: string | null
  toggleSidebar: () => void 
}) {
  return (
    <Pane
      display='flex'
      flexDirection='row-reverse'
      alignItems='center'
      gap={minorScale(1)}
      paddingX={majorScale(1)}
      height='6vh'
      background={COLOR.PRIMARY}
      borderTopLeftRadius={minorScale(1)}
      borderTopRightRadius={minorScale(1)}
    >
      <CustomAvatar username={username} avatarUrl={avatarUrl} onClick={toggleSidebar}/>
    </Pane>
  )
}

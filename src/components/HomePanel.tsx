import { Avatar, Link, majorScale, minorScale, Pane } from "evergreen-ui"
import { Link as RouterLink } from "react-router"
import LogoutButton from "../components/LogoutButton"
import { COLOR } from "../constants"

export default function HomePanel({ username }: { username: string }) {
  return (
    <Pane display='flex' flexDirection='row-reverse' alignItems='center' gap={minorScale(1)} paddingX={majorScale(1)} height='5vh' background={COLOR.PRIMARY} borderTopLeftRadius={minorScale(1)} borderTopRightRadius={minorScale(1)}>
    <LogoutButton />
    <RouterLink to={`/user/${username}/details`}>
      <Avatar name={username} size={majorScale(3)} marginRight={majorScale(2)} />
    </RouterLink>
    <RouterLink to={`/user/${username}/details`}>
      <Link padding={minorScale(1)} cursor="pointer" display="block">
        {username}
      </Link>
    </RouterLink>
    </Pane>
  )
}
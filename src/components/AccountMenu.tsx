import { Menu, Button, Text, majorScale, minorScale, Pane } from "evergreen-ui";
import { Link } from "react-router";
import LogoutButton from "./LogoutButton";
import { COLOR } from "../constants";

export default function AccountMenu({ username, setUsername, closeSidebar }: {
  username: string,
  setUsername: (username: string | null) => void,
  closeSidebar: () => void
}) {
  return (
    <Pane
      display='flex'
      flexDirection='column'
      justifyContent='right'
      gap={majorScale(1)}>
      <Link to={`/user/${username}/update-details`}>
        <Button
          appearance='minimal'
          padding={majorScale(1)}
          color={COLOR.TEXT_DARK}
          fontSize={majorScale(2)}
          width='100%'
          onClick={closeSidebar}
          style={{ justifyContent: 'flex-end' }}
        >
          <span style={{ marginRight: majorScale(2) }}>Sửa thông tin cá nhân</span>
        </Button>
      </Link>
      <Link to={`/user/${username}/change-password`}>
        <Button
          appearance='minimal'
          padding={majorScale(1)}
          color={COLOR.TEXT_DARK}
          fontSize={majorScale(2)}
          width='100%'
          onClick={closeSidebar}
          style={{ justifyContent: 'flex-end' }}
        >
          <span style={{ marginRight: majorScale(2) }}>Đổi mật khẩu</span>
        </Button>
      </Link>
      <Link to={`/user/${username}/update-profile-picture`}>
        <Button
          appearance='minimal'
          padding={majorScale(1)}
          color={COLOR.TEXT_DARK}
          fontSize={majorScale(2)}
          width='100%'
          onClick={closeSidebar}
          style={{ justifyContent: 'flex-end' }}
        >
          <span style={{ marginRight: majorScale(2) }}>Cập nhật ảnh đại diện</span>
        </Button>
      </Link>
      <LogoutButton closeSidebar={closeSidebar} setUsername={setUsername}/>
    </Pane>
  )
}
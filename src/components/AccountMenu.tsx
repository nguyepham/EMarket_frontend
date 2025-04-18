import { majorScale, minorScale, Pane } from "evergreen-ui";
import { Link } from "react-router";
import { COLOR } from "../constants";
import CustomButton from "./CustomButton";

export default function AccountMenu({ username, closeSidebar }: {
  username: string,
  setUsername: (username: string | null) => void,
  closeSidebar: () => void
}) {
  return (
    <Pane
      display='flex'
      flexDirection='column'
      justifyContent='right'
      gap={minorScale(1)}
      paddingX={majorScale(1)}>
      <Link to={`/user/${username}/update-details`}
        style={{ textDecoration: 'none', padding: 0 }}>
        <CustomButton
          text='Cập nhật thông tin cá nhân'
          backgroundColor={{
            DEFAULT: COLOR.BACKGROUND_LIGHT,
            DARK: COLOR.SECONDARY,
            LIGHT: COLOR.SECONDARY_LIGHT,
          }}
          padding='0'
          width='100%'
          justifyContent='right'
          onClick={closeSidebar}
        >
        </CustomButton>
      </Link>
      <Link to={`/user/${username}/change-password`}
        style={{ textDecoration: 'none', padding: 0 }}>
        <CustomButton
          text='Đổi mật khẩu'
          backgroundColor={{
            DEFAULT: COLOR.BACKGROUND_LIGHT,
            DARK: COLOR.SECONDARY,
            LIGHT: COLOR.SECONDARY_LIGHT,
          }}
          padding='0'
          width='100%'
          justifyContent='right'
          onClick={closeSidebar}
        >
        </CustomButton>
      </Link>
      <Link to={`/user/${username}/update-avatar`}
        style={{ textDecoration: 'none', padding: 0 }}>
        <CustomButton
          text='Cập nhật ảnh đại diện'
          backgroundColor={{
            DEFAULT: COLOR.BACKGROUND_LIGHT,
            DARK: COLOR.SECONDARY,
            LIGHT: COLOR.SECONDARY_LIGHT,
          }}
          padding='0'
          width='100%'
          justifyContent='right'
          onClick={closeSidebar}
        >
        </CustomButton>
      </Link>
    </Pane>
  )
}
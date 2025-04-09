import { Button, majorScale, minorScale, Pane } from "evergreen-ui"
import { Link } from "react-router"
import { COLOR } from "../constants"

export default function AuthPanel() {
  return (
    <Pane display='flex' flexDirection='row-reverse' alignItems='center' gap={minorScale(1)} paddingX={majorScale(1)} height='5vh' background={COLOR.PRIMARY} borderTopLeftRadius={minorScale(1)} borderTopRightRadius={minorScale(1)}>
      <Button appearance="minimal">
        <Link to='/auth/sign-up' className="no-underline flex items-center">Đăng ký</Link>
      </Button>
      <Button appearance='minimal'>
        <Link to='/auth/login' className="no-underline flex items-center">Đăng nhập</Link>
      </Button>
    </Pane>
  )
}
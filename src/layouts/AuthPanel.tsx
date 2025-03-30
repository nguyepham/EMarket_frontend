import { Button, majorScale, minorScale, Pane } from "evergreen-ui";
import { Link } from "react-router";

export default function AuthPanel() {
  return (
    <Pane display='flex' flexDirection='row-reverse' alignItems='center' gap={minorScale(1)} height='5vh' background='yellowTint' padding={majorScale(1)}>
    <Button color='yellowTint' background='yellowTint' appearance='minimal'>
      <Link to='/auth/sign-up' className="no-underline flex items-center">Sign Up</Link>
    </Button>
      <Button color='yellowTint' background='yellowTint' appearance='minimal'>
        <Link to='/auth/login' className="no-underline flex items-center">Login</Link>
      </Button>
    </Pane>
  )
}
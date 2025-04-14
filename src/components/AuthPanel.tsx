import { Button, majorScale, minorScale, Pane, Text } from 'evergreen-ui'
import { Link } from 'react-router'
import { COLOR } from '../constants'

export default function AuthPanel() {
  return (
    <Pane display='flex' flexDirection='row-reverse' alignItems='center' gap={minorScale(1)} paddingX={majorScale(1)} height='6vh' background={COLOR.PRIMARY} borderTopLeftRadius={minorScale(1)} borderTopRightRadius={minorScale(1)}>
      <Button appearance='minimal' padding={minorScale(1)}>
        <Link to='/auth/sign-up' className='no-underline flex items-center'>
          <Text
            fontSize={majorScale(2)}
            color={COLOR.TEXT_DARK}
            fontWeight={500}
            padding={minorScale(1)}
            display='flex'
            alignItems='center'
            gap={minorScale(1)}
          >
            Đăng ký
          </Text>
        </Link>
      </Button>
      <Button appearance='minimal' padding={minorScale(1)}>
        <Link to='/auth/login' className='no-underline flex items-center'>
          <Text
            fontSize={majorScale(2)}
            color={COLOR.TEXT_DARK}
            fontWeight={500}
            padding={minorScale(1)}
            display='flex'
            alignItems='center'
            gap={minorScale(1)}
          >
            Đăng nhập
          </Text>
        </Link>
      </Button>
    </Pane>
  )
}
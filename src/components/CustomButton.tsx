import { majorScale, minorScale, Text, mergeTheme, defaultTheme, ThemeProvider, Button } from 'evergreen-ui'
import { COLOR } from '../constants'

interface CustomButtonProps {
  text?: string
  width?: string | number
  onClick?: (e: any) => void
  isLoading?: boolean
  backgroundColor?: {
    DEFAULT: string
    DARK: string
    LIGHT: string
  }
  children?: React.ReactNode
}

export default function CustomButton({ text, width, onClick, isLoading, backgroundColor, children }: CustomButtonProps) {
  const theme = mergeTheme(defaultTheme, {
    components: {
      Button: {
        baseStyle: {
          color: 'black',
          backgroundColor: backgroundColor?.DEFAULT || COLOR.PRIMARY,
          selectors: {
            _hover: {
              backgroundColor: backgroundColor?.DARK || COLOR.PRIMARY_DARK,
            },
            _disabled: {
              backgroundColor: backgroundColor?.LIGHT || COLOR.PRIMARY_LIGHT,
              color: '#85A3FF',
            },
          }
        }
      }
    }
  })

  return (
    <ThemeProvider value={theme}>
      <Button appearance='none' size='large' width={width} onClick={onClick} isLoading={isLoading}>
        {!children && <Text
          fontSize={majorScale(2)}
          color={COLOR.TEXT_DARK}
          fontWeight={500}
          padding={majorScale(1)}
          display='flex'
          alignItems='center'
          gap={minorScale(1)}
        >
          {text}
        </Text>}
        {children}
      </Button>
    </ThemeProvider>
  )
}
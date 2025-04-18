import { majorScale, minorScale, Text, mergeTheme, defaultTheme, ThemeProvider, Button } from 'evergreen-ui'
import { COLOR } from '../constants'

interface CustomButtonProps {
  text?: string
  width?: string | number
  minWidth?: string | number
  maxWidth?: string | number
  padding?: string | number
  margin?: string | number
  justifyContent?: string
  onClick?: (e: any) => void
  isLoading?: boolean
  backgroundColor?: {
    DEFAULT: string
    DARK: string
    LIGHT: string
  }
  children?: React.ReactNode
}

export default function CustomButton({ text, width, minWidth, maxWidth, padding, margin, justifyContent, onClick, isLoading, backgroundColor, children }: CustomButtonProps) {
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
      <Button
        appearance='none'
        size='large'
        width={width}
        minWidth={minWidth}
        maxWidth={maxWidth}
        margin={margin}
        padding={padding || majorScale(1)}
        onClick={onClick}
        isLoading={isLoading}
        display='flex'
        justifyContent={justifyContent || 'center'}
        alignItems='center'
        gap={majorScale(1)}>
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
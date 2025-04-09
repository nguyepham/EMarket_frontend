import { mergeTheme, defaultTheme, ThemeProvider, Button } from 'evergreen-ui'
import { COLOR } from '../constants'

interface CustomButtonProps {
  text?: string
  width?: string | number
  onClick?: () => void
  isLoading?: boolean
  children?: React.ReactNode
}

export default function CustomButton({ text, width, onClick, isLoading, children }: CustomButtonProps) {
  const theme = mergeTheme(defaultTheme, {
    components: {
      Button: {
        baseStyle: {
          color: 'black',
          backgroundColor: COLOR.PRIMARY,
          selectors: {
            _hover: {
              backgroundColor: COLOR.PRIMARY_DARK,
            },
            _disabled: {
              backgroundColor: COLOR.PRIMARY_LIGHT,
              color: '#85A3FF',
            },
          }
        }
      }
    }
  })

  return (
    <ThemeProvider value={theme}>
      <Button appearance='none' width={width} onClick={onClick} isLoading={isLoading}>
        {!children && text}
        {children}
      </Button>
    </ThemeProvider>
  )
}
import { majorScale, minorScale, Pane } from 'evergreen-ui'
import { COLOR } from '../constants'

const FormContainerBody = ({ children }: {children: React.ReactNode}) => {
  return (
    <Pane
      width='40%'
      maxWidth={450}
      padding={majorScale(4)}
      paddingTop={majorScale(5)}
      borderBottomLeftRadius={minorScale(1)}
      borderBottomRightRadius={minorScale(1)}
      elevation={1}
      background={COLOR.BACKGROUND_LIGHT}
    >
      {children}
    </Pane>
  )
}

export default FormContainerBody

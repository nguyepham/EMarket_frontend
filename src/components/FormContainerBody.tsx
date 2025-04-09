import { majorScale, minorScale, Pane } from "evergreen-ui"
import { COLOR } from "../constants"

const FormContainerBody = ({ children }: {children: React.ReactNode}) => {
  return (
    <Pane
      width="60%"
      maxWidth={400}
      marginX={majorScale(2)}
      padding={majorScale(3)}
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

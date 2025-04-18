import { Pane, minorScale, Heading, majorScale } from 'evergreen-ui'
import { COLOR } from '../constants'

export default function FormContainerHeader({text}: {text: string}) {
  return (
  <Pane 
    display='flex' 
    justifyContent='center' 
    alignItems= 'center' 
    backgroundColor={COLOR.PRIMARY} 
    borderTopLeftRadius={minorScale(1)} 
    borderTopRightRadius={minorScale(1)} 
    width='40%' 
    maxWidth={450} 
    height={50} 
    elevation={1}>
    <Heading size={700} marginBottom={0} background={COLOR.PRIMARY}>{text}</Heading>
  </Pane>
  )
}
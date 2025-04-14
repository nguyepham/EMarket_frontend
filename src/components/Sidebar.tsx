// components/Sidebar.tsx
import { Pane, majorScale } from 'evergreen-ui'
import { COLOR } from '../constants'

export default function Sidebar({
  isOpen,
  sidebarRef,
  children,
}: {
  username: string
  isOpen: boolean
  sidebarRef: React.RefObject<HTMLDivElement | null>
  children?: React.ReactNode
}) {
  return (
    <Pane
      ref={sidebarRef}
      position='fixed'
      top={0}
      right={0}
      height='100vh'
      width='240px'
      background={COLOR.BACKGROUND_LIGHT}
      elevation={2}
      display='flex'
      flexDirection='column'
      gap={majorScale(3)}
      zIndex={50}
      style={{
        transition: 'transform 0.3s ease-in-out',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
      }}
    >
      {children}
    </Pane>
  )
}

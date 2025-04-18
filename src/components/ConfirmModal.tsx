import React from 'react'
import { majorScale, minorScale, Pane, Text } from 'evergreen-ui'
import CustomButton from './CustomButton'
import { COLOR } from '../constants'

interface ConfirmModalProps {
  isOpen: boolean
  title?: string
  message?: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message = 'Thao tac này không thể hoàn tác. Tiếp tục?',
  confirmLabel = 'Xác nhận',
  cancelLabel = 'Hủy',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <Pane
        position='fixed'
        top={0}
        left={0}
        width='100vw'
        height='100vh'
        background='rgba(0, 0, 0, 0.4)'
        zIndex={40}
      />

      {/* Modal Container */}
      <Pane
        position='fixed'
        top='50%'
        left='50%'
        transform='translate(-50%, -50%)'
        background='white'
        elevation={2}
        borderRadius={minorScale(1)}
        padding={majorScale(3)}
        width='90%'
        maxWidth={400}
        zIndex={50}
        display='flex'
        flexDirection='column'
        gap={majorScale(2)}
      >
        <Text fontSize={minorScale(5)} fontWeight={500}>{title}</Text>
        <Text fontSize={majorScale(2)} color='muted'>{message}</Text>

        <Pane display='flex' flexDirection='row-reverse' justifyContent='center' alignItems='center' marginTop={majorScale(2)} gap={majorScale(4)}>
          <CustomButton
            text={cancelLabel}
            onClick={onCancel}
            width='40%'
          />
          <CustomButton
            text={confirmLabel}
            onClick={onConfirm}
            width='40%'
            backgroundColor={{
              DEFAULT: COLOR.SECONDARY,
              DARK: COLOR.SECONDARY_DARK,
              LIGHT: COLOR.SECONDARY_LIGHT,
            }}
          />
        </Pane>
      </Pane>
    </>
  )
}

export default ConfirmModal

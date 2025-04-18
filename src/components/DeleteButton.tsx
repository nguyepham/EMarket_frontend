import { useState } from 'react'
import ConfirmModal from './ConfirmModal'
import CustomButton from './CustomButton'

interface DeleteButtonProps {
  resourceType: string
  onDelete: () => void
  text?: string
  width?: string | number
  minWidth?: string | number
  maxWidth?: string | number
  isLoading?: boolean
  backgroundColor?: {
    DEFAULT: string
    DARK: string
    LIGHT: string
  }
}

export default function DeleteButton({ resourceType, onDelete, text, width, minWidth, maxWidth, isLoading, backgroundColor }: DeleteButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDelete = () => setIsModalOpen(true)
  const confirmDelete = () => {
    console.log('Item deleted!')
    onDelete()
    setIsModalOpen(false)
  }
  const cancelDelete = () => setIsModalOpen(false)

  return (
    <>
      <CustomButton
        text={text || `Xóa ${resourceType}`}
        width={width}
        minWidth={minWidth}
        maxWidth={maxWidth}
        isLoading={isLoading}
        backgroundColor={backgroundColor}
        onClick={handleDelete}
      />

      <ConfirmModal
        isOpen={isModalOpen}
        title={`Xóa ${resourceType}`}
        confirmLabel='Xóa'
        cancelLabel='Hủy'
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  )
}

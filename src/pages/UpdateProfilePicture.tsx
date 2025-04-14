import { ErrorResponse, useNavigate, useOutletContext, useParams } from 'react-router'
import { FileUploader, majorScale, Pane, Heading, minorScale } from 'evergreen-ui'
import { useState } from 'react'
import { apiRequest } from '../utils/api'
import { toaster, Text } from 'evergreen-ui'
import { cropImageToSquare } from '../utils/image'
import CustomButton from '../components/CustomButton'
import { COLOR } from '../constants'
import { SuccessfulResponse } from '../types/api'
import { RootOutletContextType } from '../types/outletContext'

export default function UpdateProfilePicture() {
  const { username } = useParams()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const { setAvatarUrl } = useOutletContext<RootOutletContextType>()
  const navigate = useNavigate()

  const handleFileSelect = async (files: File[]) => {
    const file = files[0]
    if (!file) return

    try {
      const croppedFile = await cropImageToSquare(file)
      const reader = new FileReader()
      reader.onloadend = () => setPreviewUrl(reader.result as string)
      reader.readAsDataURL(croppedFile)
      setSelectedFile(croppedFile)
    } catch (err) {
      toaster.danger("Không thể xử lý ảnh.")
    }
  }

  const handleConfirmUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const res = await apiRequest<SuccessfulResponse>(
        `/user/${username}/details/profile-picture`,
        true, true,
        {
          method: 'POST',
          body: formData,
          headers: {}, // let browser handle content-type
        }
      )

      console.log('image url: ' + res)

      toaster.success("Cập nhật ảnh đại diện thành công!")
      setSelectedFile(null)
      setPreviewUrl(null)

      localStorage.setItem('avatarUrl', res.text) // Store the new avatar URL in localStorage
      setAvatarUrl(res.text) // Update the avatar URL in context

      setTimeout(() => {
        navigate(-1) // Go back to the previous page
      }, 1000)
    } catch (err) {
      toaster.danger("Tải ảnh lên thất bại.")
    } finally {
      setIsUploading(false)
    }
  }


  return (
    <Pane display="flex" flexDirection="column" alignItems="center" justifyContent="center" padding={majorScale(5)} gap={majorScale(2)}>
      {previewUrl && <img src={previewUrl} alt="Preview" style={{ maxWidth: '200px', borderRadius: '50%' }} />}
      {!previewUrl &&
        <FileUploader
          label="Chọn ảnh đại diện"
          description="Chỉ hỗ trợ PNG và JPG. Kích thước tối đa 5MB."
          maxSizeInBytes={5 * 1024 * 1024}
          multiple={false}
          disabled={isUploading}
          onAccepted={handleFileSelect}
        />
      }
      <Pane display='flex' justifyContent='center' alignItems='center' marginTop={majorScale(2)} gap={majorScale(4)}>
        <CustomButton
          text="Huỷ"
          onClick={() => navigate(-1)} // Go back to previous page
          width="40%"
          backgroundColor={{
            DEFAULT: COLOR.SECONDARY,
            DARK: COLOR.SECONDARY_DARK,
            LIGHT: COLOR.SECONDARY_LIGHT,
          }}
          isLoading={isUploading}
        />
        <CustomButton
          text="Xác nhận"
          onClick={handleConfirmUpload}
          width="40%"
          isLoading={isUploading}
        />
      </Pane>

    </Pane>
  )
}

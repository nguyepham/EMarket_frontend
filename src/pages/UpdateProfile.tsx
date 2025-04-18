import { Form, useLoaderData, useActionData, useNavigation, useNavigate, useOutletContext } from 'react-router'
import { useState } from 'react'
import { Pane, SelectField, Alert, majorScale, minorScale } from 'evergreen-ui'
import FormContainerHeader from '../components/FormContainerHeader'
import FormContainerBody from '../components/FormContainerBody'
import CustomButton from '../components/CustomButton'
import { FormActionData } from '../types/data'
import { ProfileUpdate } from '../types/model'
import { COLOR } from '../constants'
import CustomTextInputField from '../components/CustomTextInputField'
import DeleteButton from '../components/DeleteButton'
import { apiRequest } from '../utils/api'
import { RootOutletContextType } from '../types/outletContext'
import { RESOURCE_TYPE } from '../constants/resource'

export default function UserProfile() {
  const navigation = useNavigation()
  const navigate = useNavigate()
  const isSubmitting = navigation.state === 'submitting'
  const { setUsername, setAvatarUrl } = useOutletContext<RootOutletContextType>()

  const user = useLoaderData() as ProfileUpdate
  const actionData = useActionData() as FormActionData

  const [formData, setFormData] = useState<ProfileUpdate>(user)
  const [isEditing, setIsEditing] = useState(false)

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }))
  }

  const handleDeleteAccount = async () => {
    const username = localStorage.getItem('username')
    if (!username) return
    try {
      await apiRequest(`/user/${username}`, true, false, {
        method: 'DELETE',
      })
      localStorage.removeItem('jwt')
      localStorage.removeItem('username')
      localStorage.removeItem('avatarUrl')
      setUsername(null)
      setAvatarUrl(null)

      navigate('/', { replace: true })
    } catch (error) {
      console.error('Error deleting account:', error)
    }
  }

  function getError(field: string) {
    return actionData?.errors?.find((error) => error.field === field)?.message || undefined
  }

  return (
    <Pane display='flex' flexDirection='column' justifyContent='center' alignItems='center' paddingTop={majorScale(10)} paddingBottom={'28vh'} gap={0}>
      <FormContainerHeader text={'Thông tin cá nhân'} />
      <FormContainerBody>
        <Form method='post'>
          <CustomTextInputField label='Tên:' name='firstName' value={formData.firstName} onChange={handleChange} placeholder='Tên' disabled={!isEditing} isInvalid={!!getError('firstName')} validationMessage={getError('firstName')} />
          <CustomTextInputField label='Họ và tên đệm:' name='lastName' value={formData.lastName} onChange={handleChange} placeholder='Họ và tên đệm' disabled={!isEditing} isInvalid={!!getError('lastName')} validationMessage={getError('lastName')} />
          <CustomTextInputField label='Email:' name='email' type='email' value={formData.email} onChange={handleChange} placeholder='Email' disabled={!isEditing} isInvalid={!!getError('email')} validationMessage={getError('email')} />
          <CustomTextInputField label='Tuổi:' name='age' value={formData.age.toString()} onChange={handleChange} disabled={!isEditing} isInvalid={!!getError('age')} validationMessage={getError('age')} />
          <SelectField size='large' label='Giới tính:' name='gender' value={formData.gender || 'UNKNOWN'} onChange={handleChange} disabled={!isEditing} isInvalid={!!getError('gender')} validationMessage={getError('gender')}
            marginBottom={minorScale(9)}>
            <option value='UNKNOWN'>Chọn giới tính</option>
            <option value='FEMALE'>Nữ</option>
            <option value='MALE'>Nam</option>
            <option value='OTHER'>Khác</option>
          </SelectField>
          <CustomTextInputField label='Tỉnh/thành phố:' name='province' value={formData.address?.province} onChange={handleAddressChange} disabled={!isEditing} isInvalid={!!getError('province')} validationMessage={getError('province')} />
          <CustomTextInputField label='Xã/phường:' name='district' value={formData.address?.district} onChange={handleAddressChange} disabled={!isEditing} isInvalid={!!getError('district')} validationMessage={getError('district')} />
          <CustomTextInputField label='Số nhà và tên đường' name='streetAndNumber' value={formData.address?.streetAndNumber} onChange={handleAddressChange} disabled={!isEditing} isInvalid={!!getError('streetAndNumber')} validationMessage={getError('streetAndNumber')} />
          {isEditing &&
            <Pane display='flex' flexDirection='row-reverse' justifyContent='center' alignItems='center' marginTop={majorScale(8)} gap={majorScale(4)}>
              <CustomButton
                text='Xác nhận'
                width='40%'
                isLoading={isSubmitting}
              />
              <CustomButton
                text='Hủy'
                width='40%'
                backgroundColor={{
                  DEFAULT: COLOR.SECONDARY,
                  DARK: COLOR.SECONDARY_DARK,
                  LIGHT: COLOR.SECONDARY_LIGHT,
                }}
                onClick={(e) => {
                  e.preventDefault() // prevent form submission
                  setFormData(user)
                  setIsEditing(false)
                }}
                isLoading={isSubmitting}
              />
            </Pane>
          }
        </Form>
        {!isEditing &&
          <Pane display='flex' flexDirection='row-reverse' justifyContent='center' alignItems='center' marginTop={majorScale(8)} gap={majorScale(4)}>
            <CustomButton
              text='Cập nhật'
              width='40%'
              onClick={() => setIsEditing(true)}
            />
            <DeleteButton
              resourceType={RESOURCE_TYPE.USER}
              onDelete={handleDeleteAccount}
              width='40%'
              backgroundColor={{
                DEFAULT: COLOR.SECONDARY,
                DARK: COLOR.SECONDARY_DARK,
                LIGHT: COLOR.SECONDARY_LIGHT,
              }}
            />
          </Pane>
        }
      </FormContainerBody>
      {actionData?.success && <Alert intent='success' title='Cập nhật thông tin thành công.' fontSize={majorScale(1)} marginTop={majorScale(2)} />}
      {getError('server') && (
        <Alert intent='danger' title={getError('server')} fontSize={majorScale(1)} marginTop={majorScale(2)} />
      )}
    </Pane>
  )
}

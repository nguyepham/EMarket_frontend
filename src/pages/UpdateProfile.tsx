import { Form, useLoaderData, useActionData, useNavigation, useParams, useNavigate } from 'react-router'
import { useState } from 'react'
import { Pane, Text, SelectField, Alert, majorScale, minorScale } from 'evergreen-ui'
import FormContainerHeader from '../components/FormContainerHeader'
import FormContainerBody from '../components/FormContainerBody'
import CustomButton from '../components/CustomButton'
import { FormActionData } from '../types/data'
import { ProfileUpdate } from '../types/model'
import { COLOR } from '../constants'
import CustomTextInputField from '../components/CustomTextInputField'

export default function UserProfile() {
  const navigation = useNavigation()
  const navigate = useNavigate()
  const isSubmitting = navigation.state === 'submitting'

  const user = useLoaderData() as ProfileUpdate
  const actionData = useActionData() as FormActionData

  const [formData, setFormData] = useState<ProfileUpdate>(user)

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

  function getError(field: string) {
    return actionData?.errors?.find((error) => error.field === field)?.message || undefined
  }

  return (
    <Pane display='flex' flexDirection='column' justifyContent='center' alignItems='center' paddingTop={majorScale(10)} paddingBottom={'28vh'} gap={0}>
      <FormContainerHeader text={'Thông tin cá nhân'} />
      <FormContainerBody>
        <Form method='post'>
          <CustomTextInputField label='Tên:' name='firstName' value={formData.firstName} onChange={handleChange} placeholder='Tên' isInvalid={!!getError('firstName')} validationMessage={getError('firstName')} />
          <CustomTextInputField label='Họ và tên đệm:' name='lastName' value={formData.lastName} onChange={handleChange} placeholder='Họ và tên đệm' isInvalid={!!getError('lastName')} validationMessage={getError('lastName')} />
          <CustomTextInputField label='Email:' name='email' type='email' value={formData.email} onChange={handleChange} placeholder='Email' isInvalid={!!getError('email')} validationMessage={getError('email')} />
          <CustomTextInputField label='Tuổi:' name='age' value={formData.age.toString()} onChange={handleChange} isInvalid={!!getError('age')} validationMessage={getError('age')} />
          <SelectField size='large' label='Giới tính:' name='gender' value={formData.gender || 'UNKNOWN'} onChange={handleChange} isInvalid={!!getError('gender')} validationMessage={getError('gender')}
            marginBottom={minorScale(9)}>
            <option value='UNKNOWN'>Chọn giới tính</option>
            <option value='FEMALE'>Nữ</option>
            <option value='MALE'>Nam</option>
            <option value='OTHER'>Khác</option>
          </SelectField>
          <CustomTextInputField label='Tỉnh/thành phố:' name='province' value={formData.address?.province} onChange={handleAddressChange} isInvalid={!!getError('province')} validationMessage={getError('province')} />
          <CustomTextInputField label='Xã/phường:' name='district' value={formData.address?.district} onChange={handleAddressChange} isInvalid={!!getError('district')} validationMessage={getError('district')} />
          <CustomTextInputField label='Số nhà và tên đường' name='streetAndNumber' value={formData.address?.streetAndNumber} onChange={handleAddressChange} isInvalid={!!getError('streetAndNumber')} validationMessage={getError('streetAndNumber')} />
          <Pane display='flex' justifyContent='center' alignItems='center' marginTop={majorScale(8)} gap={majorScale(4)}>
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
                console.log('button clicked')
                navigate('/home')
              }}
              isLoading={isSubmitting}
            />
            <CustomButton
              text='Xác nhận'
              width='40%'
              isLoading={isSubmitting}
            />
          </Pane>

        </Form>
      </FormContainerBody>
      {actionData?.success && <Alert intent='success' title='Cập nhật thông tin thành công.' fontSize={majorScale(1)} marginTop={majorScale(2)} />}
      {getError('server') && (
        <Alert intent='danger' title={getError('server')} fontSize={majorScale(1)} marginTop={majorScale(2)} />
      )}
    </Pane>
  )
}

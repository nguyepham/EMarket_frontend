import { Form, useLoaderData, useActionData, useNavigation, useParams, useNavigate } from "react-router"
import { useState } from "react"
import { Pane, TextInputField, SelectField, Alert, majorScale } from "evergreen-ui"
import FormContainerHeader from "../components/FormContainerHeader"
import FormContainerBody from "../components/FormContainerBody"
import CustomButton from "../components/CustomButton"
import { FormActionData } from "../types/FormActionData"
import { ProfileUpdate } from "../types/model/ProfileUpdate"

export default function UserProfile() {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"

  const user = useLoaderData() as ProfileUpdate
  const actionData = useActionData() as FormActionData
  const { username } = useParams<{ username: string }>()
  const redirect = useNavigate()

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

  function handleChangePasswordRedirect() {
    redirect(`/user/${username}/change-password`)
  }

  return (
    <Pane display='flex' flexDirection='column' justifyContent='center' alignItems='center' paddingTop={majorScale(10)} paddingBottom={'28vh'} gap={0}>
      <FormContainerHeader text={'Thông tin cá nhân'}/>
      <FormContainerBody>
        <Form method="post">
          <TextInputField label="Tên:" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Tên" isInvalid={!!getError('firstName')} validationMessage={getError('firstName')} />
          <TextInputField label="Họ và tên đệm:" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Họ và tên đệm" isInvalid={!!getError('lastName')} validationMessage={getError('lastName')} />
          <TextInputField label="Email:" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" isInvalid={!!getError('email')} validationMessage={getError('email')} />
          <TextInputField label="Tuổi:" name="age" value={formData.age} onChange={handleChange} isInvalid={!!getError('age')} validationMessage={getError('age')} />
          <SelectField label="Giới tính:" name="gender" value={formData.gender || "UNKNOWN"} onChange={handleChange} isInvalid={!!getError('gender')} validationMessage={getError('gender')}>
            <option value="UNKNOWN">Chọn giới tính</option>
            <option value="FEMALE">Nữ</option>
            <option value="MALE">Nam</option>
            <option value="OTHER">Khác</option>
          </SelectField>
          <TextInputField label="Tỉnh/thành phố:" name="province" value={formData.address?.province} onChange={handleAddressChange} isInvalid={!!getError('province')} validationMessage={getError('province')} />
          <TextInputField label="Xã/phường:" name="district" value={formData.address?.district} onChange={handleAddressChange} isInvalid={!!getError('district')} validationMessage={getError('district')} />
          <TextInputField label="Số nhà và tên đường" name="streetAndNumber" value={formData.address?.streetAndNumber} onChange={handleAddressChange} isInvalid={!!getError('streetAndNumber')} validationMessage={getError('streetAndNumber')} />
          <Pane display='flex' flexDirection='column' justifyContent='center' alignItems='center' marginTop={majorScale(6)} gap={majorScale(2)}>
            <CustomButton text={'Cập nhật'} isLoading={isSubmitting} />
          </Pane>
        </Form>
        {/* <CustomButton text={'Đổi mật khẩu'} onClick={handleChangePasswordRedirect} isLoading={isSubmitting} /> */}
      </FormContainerBody>
      {actionData?.success && <Alert intent="success" title="Cập nhật thông tin thành công." marginTop={majorScale(2)} />}
      {getError('server') && (
        <Alert intent="danger" title={getError('server')} marginTop={majorScale(2)} />
      )}
    </Pane>
  )
}

import { Form, useActionData, useNavigate, useNavigation } from 'react-router'
import { useEffect, useState } from 'react'
import { Pane, TextInputField, SelectField, Alert, majorScale } from 'evergreen-ui'
import CustomButton from '../components/CustomButton'
import FormContainerHeader from '../components/FormContainerHeader'
import FormContainerBody from '../components/FormContainerBody'
import { FormActionData } from '../types/FormActionData'

export default function SignUp() {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"
  
  const actionData = useActionData() as FormActionData
  const redirect = useNavigate()
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    age: '',
    gender: '',
    province: '',
    district: '',
    streetAndNumber: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const getError = (field: string) => {
    return actionData?.errors?.find((error) => error.field === field)?.message || undefined
  }

  useEffect(() => {
    if (actionData?.success === true) {
      setTimeout(() => { 
        setFormValues({
          username: '',
          password: '',
          passwordConfirm: '',
          email: '',
          age: '',
          gender: '',
          province: '',
          district: '',
          streetAndNumber: '',
        })
        redirect('/auth/login') // Redirect to login after sign up
      }, 2000)
  }}, [actionData?.success]
)

  return (
    <Pane display='flex' flexDirection='column' justifyContent='center' alignItems='center' paddingTop={majorScale(10)} paddingBottom={'28vh'} gap={0}>
      <FormContainerHeader text={'Đăng ký'}/>
      <FormContainerBody>
        <Form method="post">
          <TextInputField label="Tên đăng nhập:" name="username" value={formValues.username} onChange={handleChange} placeholder="Tên đăng nhập" isInvalid={!!getError('username')} validationMessage={getError('username')} />
          <TextInputField label="Mật khẩu:" name="password" type="password" value={formValues.password} onChange={handleChange} placeholder="Mật khẩu" isInvalid={!!getError('password')} validationMessage={getError('password')} />
          <TextInputField label="Xác nhận mật khẩu:" name="passwordConfirm" type="password" value={formValues.passwordConfirm} onChange={handleChange} placeholder="Mật khẩu" isInvalid={!!getError('passwordConfirm')} validationMessage={getError('passwordConfirm')} />
          <TextInputField label="Email:" name="email" type="email" value={formValues.email} onChange={handleChange} placeholder="Email" isInvalid={!!getError('email')} validationMessage={getError('email')} />
          <TextInputField label="Tuổi:" name="age" value={formValues.age} onChange={handleChange} placeholder="Tuổi" isInvalid={!!getError('age')} validationMessage={getError('age')} />
          <SelectField label="Giới tính:" name="gender" value={formValues.gender} onChange={handleChange} isInvalid={!!getError('gender')} validationMessage={getError('gender')}>
            <option value="UNKNOWN">Chọn giới tính</option>
            <option value="FEMALE">Nữ</option>
            <option value="MALE">Nam</option>
            <option value="OTHER">Khác</option>
          </SelectField>
          <TextInputField label="Tỉnh/thành phố:" name="province" value={formValues.province} onChange={handleChange} placeholder="Tỉnh/thành phố" isInvalid={!!getError('province')} validationMessage={getError('province')} />
          <TextInputField label="Xã/phường:" name="district" value={formValues.district} onChange={handleChange} placeholder="Xã/phường" isInvalid={!!getError('district')} validationMessage={getError('district')} />
          <TextInputField label="Số nhà và tên đường:" name="streetAndNumber" value={formValues.streetAndNumber} onChange={handleChange} placeholder="Số nhà và tên đường" isInvalid={!!getError('streetAndNumber')} validationMessage={getError('streetAndNumber')} />
          
          <Pane display='flex' justifyContent='center' alignItems='center' marginTop={majorScale(6)}>
            <CustomButton text={'Xác nhận'} width={'100%'} isLoading={isSubmitting} />
          </Pane>
        </Form>
      </FormContainerBody>
      {getError('server') && (
        <Alert intent="danger" title={getError('server')} marginTop={majorScale(2)} />
      )}
      {actionData?.success && <Alert intent="success" title="Đăng ký tài khoản thành công." marginTop={majorScale(2)} />}
    </Pane>
  )
}

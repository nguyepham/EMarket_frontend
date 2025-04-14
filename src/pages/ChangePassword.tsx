import { useState, useEffect } from 'react'
import { Form, useActionData, useNavigate, useNavigation } from 'react-router'
import { Pane, Text, Alert, majorScale, minorScale } from 'evergreen-ui'
import FormContainerHeader from '../components/FormContainerHeader'
import { FormActionData } from '../types/data'
import FormContainerBody from '../components/FormContainerBody'
import CustomButton from '../components/CustomButton'
import CustomTextInputField from '../components/CustomTextInputField'
import { COLOR } from '../constants'

export default function ChangePassword() {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  const actionData = useActionData() as FormActionData
  const redirect = useNavigate()
  const [formValues, setFormValues] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
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
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        })
        // Store token in localStorage (or sessionStorage if preferred)
        localStorage.removeItem('jwt')
        localStorage.removeItem('username')
        window.dispatchEvent(new Event('localStorageChange'))

        redirect('/auth/login') // Redirect to login after change password
      }, 2000)
    }
  }, [actionData?.success]
  )

  return (
    <Pane
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      paddingTop={majorScale(10)}
      paddingBottom={'20vh'}
      gap={0}>
      <FormContainerHeader text='Đổi mật khẩu' />
      <FormContainerBody>
        <Form method='post'>
          <CustomTextInputField
            label='Mật khẩu hiện tại:'
            name='oldPassword'
            value={formValues.oldPassword}
            onChange={handleChange}
            type='password'
            isInvalid={!!getError('oldPassword')}
            validationMessage={getError('oldPassword')}
          />
          <CustomTextInputField
            label='Mật khẩu mới:'
            name='newPassword'
            value={formValues.newPassword}
            onChange={handleChange}
            type='password'
            isInvalid={!!getError('newPassword')}
            validationMessage={getError('newPassword')}
          />
          <CustomTextInputField
            label='Xác nhận mật khẩu mới:'
            name='confirmPassword'
            value={formValues.confirmPassword}
            onChange={handleChange}
            type='password'
            isInvalid={!!getError('confirmPassword')}
            validationMessage={getError('confirmPassword')}
          />
          <Pane display='flex' justifyContent='center' alignItems='center' marginTop={majorScale(8)} gap={majorScale(4)}>
            <CustomButton 
            text={'Hủy'} 
            width={'40%'} 
            backgroundColor={{ DEFAULT: COLOR.SECONDARY, DARK: COLOR.SECONDARY_DARK, LIGHT: COLOR.SECONDARY_LIGHT }} 
            isLoading={isSubmitting} 
            onClick={(e) => {
              e.preventDefault() // prevent form submission
              setFormValues({
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
              })
              redirect('/home')
            }} />
            <CustomButton text={'Xác nhận'} width={'40%'} isLoading={isSubmitting} />
          </Pane>
        </Form>
      </FormContainerBody>
      {getError('server') && (
        <Alert intent='danger' title={getError('server')} marginTop={majorScale(2)} />
      )}
      {actionData?.success && <Alert intent='success' title='Đổi mật khẩu thành công.' marginTop={majorScale(2)} />}
    </Pane>
  )
}
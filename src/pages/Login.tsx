import { Form, useNavigate, useActionData, useNavigation, useOutletContext } from 'react-router'
import { useEffect, useState } from 'react'
import { Pane, Text, Alert, majorScale, minorScale } from 'evergreen-ui'
import CustomButton from '../components/CustomButton'
import FormContainerHeader from '../components/FormContainerHeader'
import FormContainerBody from '../components/FormContainerBody'
import { FormActionData } from '../types/data'
import CustomTextInputField from '../components/CustomTextInputField'
import { COLOR } from '../constants'
import { RootOutletContextType } from '../types/outletContext'
import { apiRequest } from '../utils/api'
import { User } from '../types/model'

export default function Login() {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const { setUsername, setAvatarUrl } = useOutletContext<RootOutletContextType>()

  const actionData = useActionData() as FormActionData
  const redirect = useNavigate()
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        })
        // Store token in localStorage (or sessionStorage if preferred)
        localStorage.setItem('jwt', actionData.token)
        localStorage.setItem('username', actionData.username)

        const fetchAvatar = async () => {
          try {
            const res = await apiRequest<User>(`/user/${actionData.username}`, true, false)
            localStorage.setItem('avatarUrl', res.imageUrl!) // Store the new avatar URL in localStorage
            console.log('Fetched avatar URL from Login:', res.imageUrl)

          } catch (err) {
            console.error('Failed to fetch avatar:', err)
          }
        }
        fetchAvatar().then(() => {
          setUsername(actionData.username)
          setAvatarUrl(localStorage.getItem('avatarUrl')!)

          redirect('/home') // Redirect to home after login
        })
      }, 1000)
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
      paddingBottom={'28vh'} gap={0}
    >
      <FormContainerHeader text={'Đăng nhập'} />
      <FormContainerBody>
        <Form method='post'>
          {/* Username */}
          <CustomTextInputField
            label='Tên đăng nhập:'
            name='username'
            value={formValues.username}
            // inputHeight={majorScale(5)}
            onChange={handleChange}
            placeholder='Tên đăng nhập'
            isInvalid={!!getError('username')}
            validationMessage={getError('username')}
          />

          {/* Password */}
          <CustomTextInputField
            label='Mật khẩu:'
            name='password'
            type='password'
            value={formValues.password}
            onChange={handleChange}
            placeholder='Mật khẩu'
            isInvalid={!!getError('password')}
            validationMessage={getError('password')}
          />
          <Pane display='flex' justifyContent='center' alignItems='center' marginTop={majorScale(8)}>
            <CustomButton text={'Đăng nhập'} width={'100%'} isLoading={isSubmitting} />
          </Pane>
        </Form>
      </FormContainerBody>
      {getError('server') && (
        <Alert intent='danger' title={getError('server')} marginTop={majorScale(2)} />
      )}
      {actionData?.success && <Alert intent='success' title='Đăng nhập thành công.' marginTop={majorScale(2)} />}
    </Pane>
  )
}

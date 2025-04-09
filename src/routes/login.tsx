import { ActionFunction, redirect } from 'react-router'
import { FormFieldValidator, validateForm } from '../utils/form'
import { FormActionData } from '../types/FormActionData'
import { apiRequest } from '../utils/api'

type LoginRequest = {
  username: string
  password: string
}

type LoginResponse = {
  status?: number
  statusText?: string
  text?: string
}

export const loginLoader = () => {
  const token = localStorage.getItem('jwt')
  if (token) {
    return redirect('/home')
  }
  return null
}

export const loginAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData()

  // Validate input fields
  const { data, errors } = validateForm({
    username: new FormFieldValidator(formData, 'username').required(),
    password: new FormFieldValidator(formData, 'password').required(),
  })

  if (errors.length > 0 || !data) {
    return {
      errors: errors.length > 0 ? errors : [{ field: 'server', message: 'Form data is missing' }],
      success: false,
    } as FormActionData
  }  

  const loginData: LoginRequest = {
    username: data.username as string,
    password: data.password as string,
  }

  try {
    // const token = await login(loginData)
    const res = await apiRequest<LoginResponse>('/auth/login', false, {
      method: 'POST',
      body: JSON.stringify(loginData),
    })

    console.log('res: ', res)

    if (res?.status && res?.statusText) {
      return {
        errors: [{ field: 'server', message: 'Tên đăng nhập hoặc mật khẩu không đúng' }],
        success: false,
      } as FormActionData
    }
    return {
      success: true,
      token: res?.text,
      username: loginData.username,
    } as FormActionData
    
  } catch (err: any) {
    return {
      errors: [{ field: 'server', message: err.statusText || 'Đăng nhập thất bại' }],
      success: false,
    } as FormActionData
  }
}

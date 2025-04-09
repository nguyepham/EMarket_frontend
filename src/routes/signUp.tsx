import { ActionFunctionArgs } from 'react-router'
import { FormFieldValidator, validateForm } from '../utils/form'
import bcrypt from 'bcryptjs'
import { FormActionData } from '../types/FormActionData'
import { apiRequest } from '../utils/api'

type SignUpRequest = {
  username: string
  password: {
    text: string
    updatedAt: string
  }
  email?: string
  age: number
  gender?: "FEMALE" | "MALE" | "OTHER" | "UNKNOWN"
  address: {
    province: string
    district: string
    streetAndNumber: string
  }
}

type SignUpResponse = {
  status?: number
  statusText?: string
  text?: string
}

export async function signUpAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData()

  const fields = {
    username: new FormFieldValidator(formData, 'username').required().minLength(6).maxLength(36),
    password: new FormFieldValidator(formData, 'password')
    .required()
    .minLength(8)
    .maxLength(60)
    .containsNumber()
    .containsCapitalLetter(),
    passwordConfirm: new FormFieldValidator(formData, 'passwordConfirm').required(),
    email: new FormFieldValidator(formData, 'email').isEmail(),
    age: new FormFieldValidator(formData, 'age').required().minNumber(13).maxNumber(120),
    province: new FormFieldValidator(formData, 'province').required(),
    district: new FormFieldValidator(formData, 'district').required(),
    streetAndNumber: new FormFieldValidator(formData, 'streetAndNumber').required(),
  }

  const { data, errors } = validateForm(fields)

  if (data?.password !== data?.passwordConfirm) {
    errors.push({ field: 'passwordConfirm', message: 'Mật khẩu xác nhận không khớp' })
  }
  
  if (errors.length > 0 || !data) {
    return {
      errors: errors.length > 0 ? errors : [{ field: 'server', message: 'Form data is missing' }],
      success: false,
    } as FormActionData
  } 

  const signUpData: SignUpRequest = {
    username: data.username as string,
    password: {
      text: await bcrypt.hash(data.password as string, 12),
      updatedAt: new Date().toISOString(),
    },
    email: data.email as string | undefined, // optional
    age: data.age as number,
    gender: formData.get('gender') as SignUpRequest['gender'], // optional
    address: {
      province: data.province as string,
      district: data.district as string,
      streetAndNumber: data.streetAndNumber as string,
    },
  }
  
    try {
      // const token = await login(loginData)
      const res = await apiRequest<SignUpResponse>('/auth/sign-up', false, {
        method: 'POST',
        body: JSON.stringify(signUpData),
      })
  
      console.log('res: ', res)
  
      if (res?.status && res?.statusText) {
        let errorMessage = 'Đăng ký thất bại'

        if (res?.statusText.includes('Username')) {
          errorMessage = 'Tên đăng nhập đã tồn tại'
        } else if (res?.statusText.includes('Email')) {
          errorMessage = 'Email đã tồn tại'
        }

        return {
          errors: [{ field: 'server', message: errorMessage }],
          success: false,
        } as FormActionData
      }
      return {
        success: true,
      } as FormActionData
      
    } catch (err: any) {
      return {
        errors: [{ field: 'server', message: err.statusText || 'Đăng nhập thất bại' }],
        success: false,
      } as FormActionData
    }
}

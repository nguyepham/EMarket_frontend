import { ActionFunctionArgs, redirect } from 'react-router'
import { FormFieldValidator, validateForm } from '../utils/form'
import { signUp } from '../api/authApi'
import { SignUpRequest } from '../types/api'
import { ROUTES } from '../constants'
import bcrypt from 'bcryptjs'

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
    gender: new FormFieldValidator(formData, 'gender'),
    province: new FormFieldValidator(formData, 'province').required(),
    district: new FormFieldValidator(formData, 'district').required(),
    streetAndNumber: new FormFieldValidator(formData, 'streetAndNumber').required(),
  }

  const { data, errors } = validateForm(fields)

  if (data?.password !== data?.passwordConfirm) {
    errors.push({ field: 'passwordConfirm', message: 'Passwords do not match' })
  }

  if (errors.length > 0 || !data) {
    return new Response(
      JSON.stringify({ errors: errors.length > 0 ? errors : [{ field: 'server', message: 'Form data is missing' }] }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  const signUpData: SignUpRequest = {
    username: data.username as string,
    password: {
      text: await bcrypt.hash(data.password as string, 12),
      updatedAt: new Date().toISOString(),
    },
    email: data.email as string | undefined, // optional
    age: data.age as number,
    gender: data.gender as SignUpRequest['gender'], // optional
    address: {
      province: data.province as string,
      district: data.district as string,
      streetAndNumber: data.streetAndNumber as string,
    },
  }

  try {
    await signUp(signUpData)
    return redirect(ROUTES.LOGIN)
  } catch (err: any) {
    return new Response(
      JSON.stringify({ errors: [{ field: 'server', message: err.statusText }] }), 
      { 
        status: err.status || 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    )
  }
}

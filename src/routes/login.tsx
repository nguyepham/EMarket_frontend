import { ActionFunction, redirect } from 'react-router'
import { login } from '../api/authApi'
import { FormFieldValidator, validateForm } from '../utils/form'
import { LoginRequest } from '../types/api'

export const loginAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData()

  // Validate input fields
  const { data, errors } = validateForm({
    username: new FormFieldValidator(formData, 'username').required(),
    password: new FormFieldValidator(formData, 'password').required(),
  })

  if (errors.length > 0 || !data) {
    return new Response(
      JSON.stringify({ errors: errors.length > 0 ? errors : [{ field: 'server', message: 'Form data is missing' }] }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }  

  const loginData: LoginRequest = {
    username: data.username as string,
    password: data.password as string,
  }

  try {
    const token = await login(loginData)

    // Store token in localStorage (or sessionStorage if preferred)
    localStorage.setItem('jwt', token)

    return redirect('/home') // Redirect to home after login
  } catch (err: any) {
    return new Response(
      JSON.stringify({ errors: [{ field: 'server', message: err.message }] }),
      { status: err.httpStatus || 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

import { ActionFunction } from 'react-router'
import { apiRequest } from '../utils/api' 
import { validateForm, FormFieldValidator } from '../utils/form'
import bcrypt from 'bcryptjs'
import { FormActionData } from '../types/data'

type ChangePasswordRequest = {
  oldPassword: string
  newPassword: {
    text: string
    updatedAt: string
  }
}

type ChangePasswordResponse = {
  status?: number
  statusText?: string
  text?: string
}

export const changePasswordAction: ActionFunction = async ({ request, params }) => {
  const username = params.username 
  if (!username) {
    return { message: 'Username is missing' }
  }
  const formData = await request.formData()

  const { data, errors } = validateForm({
    oldPassword: new FormFieldValidator(formData, 'oldPassword').required(),
    newPassword: new FormFieldValidator(formData, 'newPassword').required().
    minLength(8).
    maxLength(60).
    containsNumber().
    containsCapitalLetter(),
    confirmPassword: new FormFieldValidator(formData, 'confirmPassword').required()
  })

  if (data?.newPassword !== data?.confirmPassword) {
    errors.push({ field: 'confirmPassword', message: 'Mật khẩu xác nhận không khớp' })
  }

  if (errors.length > 0 || !data) {
      return {
        errors: errors.length > 0 ? errors : [{ field: 'server', message: 'Form data is missing' }],
        success: false,
      } as FormActionData
  }

  const hashedNewPassword = await bcrypt.hash(data.newPassword as string, 12)

  const newPassword = {
    text: hashedNewPassword,
    updatedAt: new Date().toISOString(),
  }

  const changePasswordData: ChangePasswordRequest = {
    oldPassword: data.oldPassword as string,
    newPassword: newPassword,
  }

  try {
    const res = await apiRequest<ChangePasswordResponse>(`/user/${username}/details/password`, true, false, {
      method: 'PUT',
      body: JSON.stringify(changePasswordData),
    })

    console.log('res: ', res)

    if (res?.status && res?.statusText) {
      return {
        errors: [{ field: 'server', message: 'Mật khẩu hiện tại không đúng' }],
        success: false,
      } as FormActionData
    }
    return {
      success: true,
    } as FormActionData

  } catch (err: any) {
    return {
      errors: [{ field: 'server', message: err.statusText || 'Đổi mật khẩu thất bại' }],
      success: false,
    } as FormActionData
  }
}
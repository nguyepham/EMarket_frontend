import { LoaderFunction, ActionFunction } from "react-router"
import { validateForm, FormFieldValidator } from "../utils/form"
import { apiRequest } from "../utils/api"
import { FormActionData } from "../types/FormActionData"
import { ProfileUpdate } from "../types/model/ProfileUpdate"

type ProfileUpdateResponse = {
  status?: number
  statusText?: string
  updatedProfile?: ProfileUpdate
}

export const userProfileLoader: LoaderFunction = async ({ params }) => {
  const username = params.username
  return await apiRequest<ProfileUpdate>(`/user/${username}/details`)
}

export const userProfileAction: ActionFunction = async ({ request, params }) => {
  const username = params.username
  const formData = await request.formData()

  // Validate input fields
  const fields = {
    firstName: new FormFieldValidator(formData, "firstName").maxLength(36),
    lastName: new FormFieldValidator(formData, "lastName").maxLength(36),
    email: new FormFieldValidator(formData, "email").isEmail().maxLength(100),
    age: new FormFieldValidator(formData, "age").minNumber(13).maxNumber(120),
  }

  const { data, errors } = validateForm(fields)
    
    if (errors.length > 0 || !data) {
      return {
        errors: errors.length > 0 ? errors : [{ field: 'server', message: 'Form data is missing' }],
        success: false,
      } as FormActionData
    } 

  const updatedProfileData: ProfileUpdate = {
    firstName: data.firstName as string,
    lastName: data.lastName as string,
    email: data.email as string,
    age: data.age as number,
    gender: formData.get("gender") as ProfileUpdate['gender'],
    address: {
      province: formData.get("province") as string,
      district: formData.get("district") as string,
      streetAndNumber: formData.get("streetAndNumber") as string,
    },
  }

  try {
    const res = await apiRequest<ProfileUpdateResponse>(`/user/${username}/details`, true, {
      method: "PUT",
      body: JSON.stringify(updatedProfileData),
    })
  
    console.log('res: ', res)

    if (res?.status && res?.statusText) {
      return {
        errors: [{ field: 'server', message: res.statusText }],
        success: false,
      } as FormActionData
    }
    return {
      success: true,
      updatedProfile: res.updatedProfile,
    } as FormActionData

  } catch (err: any) {
    return {
      errors: [{ field: 'server', message: err.statusText || 'Đăng nhập thất bại' }],
      success: false,
    } as FormActionData
  }
}

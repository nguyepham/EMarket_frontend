import { LoaderFunction, ActionFunction } from "react-router";
import { validateForm, FormFieldValidator } from "../utils/form";
import { apiRequest } from "../utils/api";
import { UserUpdate } from "../types/api";

export const userProfileLoader: LoaderFunction = async ({ params }) => {
  const username = params.username;

  return await apiRequest<UserUpdate>(`/user/${username}/details`);
};

export const userProfileAction: ActionFunction = async ({ request, params }) => {
  const username = params.username; 
  if (!username) {
    return { message: "Username is missing" };
  }
  const formData = await request.formData();

  // Validate input fields
  const fields = {
    firstName: new FormFieldValidator(formData, "firstName").maxLength(36),
    lastName: new FormFieldValidator(formData, "lastName").maxLength(36),
    email: new FormFieldValidator(formData, "email").isEmail().maxLength(100),
    age: new FormFieldValidator(formData, "age").minNumber(13).maxNumber(120),
    gender: new FormFieldValidator(formData, "gender").isGender(),
  }

  const { data, errors } = validateForm(fields)

  if (errors.length > 0 || !data) {
    return new Response(
      JSON.stringify({ errors: errors.length > 0 ? errors : [{ field: 'server', message: 'Form data is missing' }] }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  const updatedProfileData: UserUpdate = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    age: data.age as number,
    gender: data.gender as UserUpdate['gender'],
    address: {
      province: formData.get("province") as string,
      district: formData.get("district") as string,
      streetAndNumber: formData.get("streetAndNumber") as string,
    },
  }

  try {
    const updatedProfile = await apiRequest<UserUpdate>(`/user/${username}/details`, true, {
      method: "PUT",
      body: JSON.stringify(updatedProfileData),
    });

    return updatedProfile;

  } catch (error: any) {
    if (error.response?.status === 400) {
      return { errors: error.response.data.errors }; // Field-specific validation errors
    }
    return { message: error.message || "An unexpected error occurred" };
  }
}

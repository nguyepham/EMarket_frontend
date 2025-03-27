import { ActionFunction, ErrorResponse } from "react-router";
import { apiRequest } from "../utils/api"; // Assuming you have a global API request utility
import { ChangePasswordRequest } from "../types/api/ChangePasswordRequest";
import { validateForm, FormFieldValidator } from "../utils/form";
import bcrypt from "bcryptjs";

export const updatePasswordAction: ActionFunction = async ({ request, params }) => {
  console.log('This is from updatePasswordAction:\nrequest: ', request, '\nparams: ', params);
  const username = params.username; 
  if (!username) {
    return { message: "Username is missing" };
  }
  const formData = await request.formData();

  const { data, errors } = validateForm({
    oldPassword: new FormFieldValidator(formData, "oldPassword").required(),
    newPassword: new FormFieldValidator(formData, "newPassword").required().
    minLength(8).
    maxLength(60).
    containsNumber().
    containsCapitalLetter(),
  })

  if (errors.length > 0 || !data) {
    console.log('This is from updatePasswordAction:\nerrors: ', errors, '\ndata: ', data);
    return new Response(
      JSON.stringify({ errors: errors.length > 0 ? errors : [{ field: 'server', message: 'Form data is missing' }] }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  const hashedNewPassword = await bcrypt.hash(data.newPassword as string, 12);

  const newPassword = {
    text: hashedNewPassword,
    updatedAt: new Date().toISOString(),
  }

  const payload: ChangePasswordRequest = {
    oldPassword: data.oldPassword as string,
    newPassword: newPassword,
  }

  try {
    await apiRequest(`/user/${username}/details/password`, true, {
      method: "PUT",
      body: JSON.stringify(payload),
    })

   return { success: true };
  } catch (err: any) {
    console.error('API request failed:', (err as ErrorResponse).statusText || err.message)
    return new Response(
      JSON.stringify({ errors: [{ field: 'server', message: (err.status === 403) ? "Mật khẩu hiện tại không đúng" : err.statusText }] }), 
      { 
        status: err.status || 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    )
  }
};

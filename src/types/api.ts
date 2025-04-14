export type ChangePasswordRequest = {
  oldPassword: string
  newPassword: {
    text: string
    updatedAt: string
  }
}

export type SuccessfulResponse = {
  text: string
}
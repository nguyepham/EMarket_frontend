export type ChangePasswordRequest = {
  oldPassword: string
  newPassword: {
    text: string
    updatedAt: string
  }
}
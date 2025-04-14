export type FormActionData = {
  errors?: { field: string, message: string }[]
  success: boolean
  [key: string]: any // This allows for additional properties to be added to the response
}
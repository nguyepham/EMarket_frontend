export type ProfileUpdate = {
  firstName?: string
  lastName?: string
  email?: string
  age?: number
  gender?: "FEMALE" | "MALE" | "OTHER" | "UNKNOWN"
  address?: {
    province?: string
    district?: string
    streetAndNumber?: string
  }
}
export type SignUpRequest = {
  username: string
  password: {
    text: string
    updatedAt: string
  }
  email?: string
  age: number
  gender?: "FEMALE" | "MALE" | "OTHER" | "UNKNOWN";
  address: {
    province: string
    district: string
    streetAndNumber: string
  }
}
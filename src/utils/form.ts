import { ProfileUpdate } from "../types/model/ProfileUpdate"

export type ValidationError = {
  field: string
  message: string
}

export type ValidationResult<T> = {
  data: T | null
  errors: ValidationError[]
}

function toDisplayFieldName(fieldName: string): string {
  switch (fieldName) {
    case 'username':
      return 'Tên đăng nhập'
    case 'password':
      return 'Mật khẩu'
    case 'passwordConfirm':
      return 'Mật khẩu xác nhận'
    case 'email':
      return 'Email'
    case 'age':
      return 'Tuổi'
    case 'province':
      return 'Tỉnh/thành phố'
    case 'district':
      return 'Xã/phường'
    case 'streetAndNumber':
      return 'Số nhà và tên đường'
    case 'oldPassword':
      return 'Mật khẩu hiện tại'
    case 'newPassword':
      return 'Mật khẩu mới'
    case 'confirmPassword':
      return 'Xác nhận mật khẩu mới'
    default:
      return fieldName
  }
}

export class FormFieldValidator<T = string> {
  private raw: FormDataEntryValue | null
  private fieldName: string
  private value: string
  private error: string | null = null // Store error instead of throwing

  constructor(formData: FormData, fieldName: string) {
    this.fieldName = fieldName
    this.raw = formData.get(fieldName)
    this.value = typeof this.raw === 'string' ? this.raw.trim() : ''
  }

  required(): this {
    if (!this.value) {
      this.error = `${toDisplayFieldName(this.fieldName)} là bắt buộc`
    }
    return this
  }

  minLength(min: number): this {
    if (!this.error && this.value.length < min) {
      this.error = `${toDisplayFieldName(this.fieldName)} phải có ít nhất ${min} ký tự`
    }
    return this
  }

  maxLength(max: number): this {
    if (!this.error && this.value.length > max) {
      this.error = `${toDisplayFieldName(this.fieldName)} chỉ được chứa nhiều nhất ${max} ký tự`
    }
    return this
  }

  containsNumber(): this {
    if (!this.error && !/\d/.test(this.value)) {
      this.error = `${toDisplayFieldName(this.fieldName)} phải chứa ít nhất một chữ số`
    }
    return this
  }

  containsCapitalLetter(): this {
    if (!this.error && !/[A-Z]/.test(this.value)) {
      this.error = `${toDisplayFieldName(this.fieldName)} phải chứa ít nhất một chữ cái viết hoa`
    }
    return this
  }

  isEmail(): this {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (this.value && !this.error && !emailRegex.test(this.value)) {
      this.error = `${toDisplayFieldName(this.fieldName)} không hợp lệ`
    }
    return this
  }

  toString(): string {
    return this.value
  }

  minNumber(min?: number): this {
    if (!this.value) return this
    const number = Number(this.value)
    if (isNaN(number)) {
      this.error = `${toDisplayFieldName(this.fieldName)} phải là một số`
      return this
    }
    if (min !== undefined && number < min) {
      this.error = `${toDisplayFieldName(this.fieldName)} không được nhỏ hơn ${min}`
    }
    return this
  }

  maxNumber(max?: number): this {
    const number = Number(this.value)
    if (isNaN(number)) {
      this.error = `${toDisplayFieldName(this.fieldName)} phải là một số`
      return this
    }
    if (max !== undefined && number > max) {
      this.error = `${toDisplayFieldName(this.fieldName)} không được lớn hơn ${max}`
    }
    return this
  }

  isGender(): this {
    const allowedGenders: ProfileUpdate["gender"][] = ["FEMALE", "MALE", "OTHER", "UNKNOWN"]
    if (!allowedGenders.includes(this.value as ProfileUpdate['gender'])) {
      this.error = `${toDisplayFieldName(this.fieldName)} must be one of ${allowedGenders.join(", ")}`
    }
    return this
  }

  validate(): T {
    if (this.error) throw new Error(this.error)
    return this.value as unknown as T
  }

  getError(): string | null {
    return this.error
  }
}

export function validateForm<T>(fields: Record<keyof T, FormFieldValidator<any>>): ValidationResult<T> {
  const result: any = {}
  const errors: ValidationError[] = []

  for (const key in fields) {
    const validator = fields[key]
    const error = validator.getError()

    if (error) {
      errors.push({ field: key, message: error })
    } else {
      result[key] = validator.validate()
    }
  }

  return {
    data: errors.length === 0 ? (result as T) : null,
    errors,
  }
}

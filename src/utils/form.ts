import { UserUpdate } from "../types/api"

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
      return 'Username'
    case 'password':
      return 'Password'
    case 'passwordConfirm':
      return 'Password confirmation'
    case 'email':
      return 'Email'
    case 'age':
      return 'Age'
    case 'province':
      return 'Province'
    case 'district':
      return 'District'
    case 'streetAndNumber':
      return 'Street and number'
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
      this.error = `${toDisplayFieldName(this.fieldName)} is required`
    }
    return this
  }

  minLength(min: number): this {
    if (!this.error && this.value.length < min) {
      this.error = `${toDisplayFieldName(this.fieldName)} must be at least ${min} characters`
    }
    return this
  }

  maxLength(max: number): this {
    if (!this.error && this.value.length > max) {
      this.error = `${toDisplayFieldName(this.fieldName)} must be at most ${max} characters`
    }
    return this
  }

  containsNumber(): this {
    if (!this.error && !/\d/.test(this.value)) {
      this.error = `${toDisplayFieldName(this.fieldName)} must contain a number`
    }
    return this
  }

  containsCapitalLetter(): this {
    if (!this.error && !/[A-Z]/.test(this.value)) {
      this.error = `${toDisplayFieldName(this.fieldName)} must contain a capital letter`
    }
    return this
  }

  isEmail(): this {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (this.value && !this.error && !emailRegex.test(this.value)) {
      this.error = `${toDisplayFieldName(this.fieldName)} must be a valid email address`
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
      this.error = `${toDisplayFieldName(this.fieldName)} must be a valid number`
      return this
    }
    if (min !== undefined && number < min) {
      this.error = `${toDisplayFieldName(this.fieldName)} must be at least ${min}`
    }
    return this
  }

  maxNumber(max?: number): this {
    const number = Number(this.value)
    if (isNaN(number)) {
      this.error = `${toDisplayFieldName(this.fieldName)} must be a valid number`
      return this
    }
    if (max !== undefined && number > max) {
      this.error = `${toDisplayFieldName(this.fieldName)} must be at most ${max}`
    }
    return this
  }

  isGender(): this {
    const allowedGenders: UserUpdate["gender"][] = ["FEMALE", "MALE", "OTHER", "UNKNOWN"];
    if (!allowedGenders.includes(this.value as UserUpdate['gender'])) {
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

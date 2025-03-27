import { Form, useActionData } from 'react-router'
import { useState } from 'react'

type ValidationError = {
  field: string
  message: string
}

type ActionData = {
  errors?: ValidationError[]
}

export default function SignUp() {
  const actionData = useActionData() as ActionData
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    age: '',
    gender: '',
    province: '',
    district: '',
    streetAndNumber: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const getError = (field: string) => {
    return actionData?.errors?.find((error) => error.field === field)?.message || ''
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
      <Form method="post" className="space-y-4">
        {/* Username */}
        <div>
          <label className="block font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            placeholder='Username'
            className="w-full p-2 border rounded"
          />
          <p className="text-red-500 text-sm">{getError('username')}</p>
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder='Password'
            className="w-full p-2 border rounded"
          />
          <p className="text-red-500 text-sm">{getError('password')}</p>
        </div>

        {/* Password confirm */}
        <div>
          <label className="block font-medium">Repeat password</label>
          <input
            type="password"
            name="passwordConfirm"
            value={formValues.passwordConfirm}
            onChange={handleChange}
            placeholder='Password'
            className="w-full p-2 border rounded"
          />
          <p className="text-red-500 text-sm">{getError('passwordConfirm')}</p>
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder='Email'
            className="w-full p-2 border rounded"
          />
          <p className="text-red-500 text-sm">{getError('email')}</p>
        </div>

        {/* Age */}
        <div>
          <label className="block font-medium">Age</label>
          <input
            type="text"
            name="age"
            value={formValues.age}
            onChange={handleChange}
            placeholder='Age'
            className="w-full p-2 border rounded"
          />
          <p className="text-red-500 text-sm">{getError('age')}</p>
        </div>

        {/* Gender */}
        <div>
          <label className="block font-medium">Gender</label>
          <select
            name="gender"
            value={formValues.gender}
            onChange={handleChange}
            defaultValue={''}
            className="w-full p-2 border rounded"
          >
            <option value="UNKNOWN">Select</option>
            <option value="FEMALE">Female</option>
            <option value="MALE">Male</option>
            <option value="OTHER">Other</option>
          </select>
          <p className="text-red-500 text-sm">{getError('gender')}</p>
        </div>

        {/* Address */}
        <div>
          <label className="block font-medium">Province</label>
          <input
            type="text"
            name="province"
            value={formValues.province}
            onChange={handleChange}
            placeholder='Province'
            className="w-full p-2 border rounded"
          />
          <p className="text-red-500 text-sm">{getError('province')}</p>
        </div>

        <div>
          <label className="block font-medium">District</label>
          <input
            type="text"
            name="district"
            value={formValues.district}
            onChange={handleChange}
            placeholder='District'
            className="w-full p-2 border rounded"
          />
          <p className="text-red-500 text-sm">{getError('district')}</p>
        </div>

        <div>
          <label className="block font-medium">Street and Number</label>
          <input
            type="text"
            name="streetAndNumber"
            value={formValues.streetAndNumber}
            onChange={handleChange}
            placeholder='Street and Number'
            className="w-full p-2 border rounded"
          />
          <p className="text-red-500 text-sm">{getError('streetAndNumber')}</p>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Sign Up
        </button>

        {/* Server Error */}
        {getError('server') && (
          <p className="text-red-500 text-center mt-2">{getError('server')}</p>
        )}
      </Form>
    </div>
  )
}

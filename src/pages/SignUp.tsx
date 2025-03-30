import { Form, useActionData } from 'react-router'
import { useState } from 'react'
import { Pane, Heading, TextInputField, SelectField, Button, Alert, majorScale, minorScale } from 'evergreen-ui'

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
    return actionData?.errors?.find((error) => error.field === field)?.message || undefined
  }

  return (
    <Pane display='flex' flexDirection='column' justifyContent='center' alignItems='center' paddingTop={majorScale(5)} gap={0}>
      <Pane display='flex' justifyContent='center' alignItems='center' background='yellow100' width='60%' height={50} elevation={1}>
        <Heading size={700} marginBottom={0} background='yellow100'>Sign Up</Heading>
      </Pane>
      <Pane width='60%' maxWidth={500} marginX='auto' marginTop={0} padding={majorScale(3)} borderBottomLeftRadius={minorScale(1)} borderBottomRightRadius={minorScale(1)} elevation={1} background='white'>
        <Form method="post">
          <TextInputField label="Username" name="username" value={formValues.username} onChange={handleChange} placeholder="Enter your username" isInvalid={!!getError('username')} validationMessage={getError('username')} />
          <TextInputField label="Email" name="email" type="email" value={formValues.email} onChange={handleChange} placeholder="Enter your email" isInvalid={!!getError('email')} validationMessage={getError('email')} />
          <TextInputField label="Password" name="password" type="password" value={formValues.password} onChange={handleChange} placeholder="Enter your password" isInvalid={!!getError('password')} validationMessage={getError('password')} />
          <TextInputField label="Confirm Password" name="passwordConfirm" type="password" value={formValues.passwordConfirm} onChange={handleChange} placeholder="Confirm your password" isInvalid={!!getError('passwordConfirm')} validationMessage={getError('passwordConfirm')} />
          <TextInputField label="Age" name="age" type="number" value={formValues.age} onChange={handleChange} placeholder="Enter your age" isInvalid={!!getError('age')} validationMessage={getError('age')} />
          <SelectField label="Gender" name="gender" value={formValues.gender} onChange={handleChange} isInvalid={!!getError('gender')} validationMessage={getError('gender')}>
            <option value="">Select</option>
            <option value="FEMALE">Female</option>
            <option value="MALE">Male</option>
            <option value="OTHER">Other</option>
          </SelectField>
          <TextInputField label="Province" name="province" value={formValues.province} onChange={handleChange} placeholder="Enter your province" isInvalid={!!getError('province')} validationMessage={getError('province')} />
          <TextInputField label="District" name="district" value={formValues.district} onChange={handleChange} placeholder="Enter your district" isInvalid={!!getError('district')} validationMessage={getError('district')} />
          <TextInputField label="Street and Number" name="streetAndNumber" value={formValues.streetAndNumber} onChange={handleChange} placeholder="Enter your street and number" isInvalid={!!getError('streetAndNumber')} validationMessage={getError('streetAndNumber')} />
          
          <Pane display='flex' justifyContent='center' alignItems='center' marginTop={majorScale(6)}>
            <Button appearance='minimal' backgroundColor='yellowTint' type="submit">Sign Up</Button>
          </Pane>
          
          {getError('server') && (
            <Alert intent="danger" title={getError('server')} marginTop={majorScale(2)} />
          )}
        </Form>
      </Pane>
    </Pane>
  );
}

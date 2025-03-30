import { Form, useActionData } from 'react-router'
import { useState } from 'react'
import { Pane, Heading, TextInputField, Button, Alert, majorScale, minorScale } from 'evergreen-ui'

type ValidationError = {
  field: string
  message: string
}

type ActionData = {
  errors?: ValidationError[]
}

export default function Login() {
  const actionData = useActionData() as ActionData
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const getError = (field: string) => {
    return actionData?.errors?.find((error) => error.field === field)?.message || undefined
  }

  return (
    <Pane display='flex' flexDirection='column' justifyContent='center' alignItems='center' paddingTop={majorScale(5)} gap={0}>
      <Pane display='flex' justifyContent='center' alignItems= 'center' background='yellow100' width='60%' maxWidth={500} height={50} elevation={1}>
        <Heading size={700} marginBottom={0} background='yellow100'>Login</Heading>
      </Pane>
      <Pane width='60%' maxWidth={500} marginX='auto' marginTop={0} padding={majorScale(3)} borderBottomLeftRadius={minorScale(1)} borderBottomRightRadius={minorScale(1)} elevation={1} background='white'>
        <Form method="post">
          {/* Username */}
          <TextInputField
            label="Username"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            placeholder="Enter your username"
            isInvalid={!!getError('username')}
            validationMessage={getError('username')}
          />
          
          {/* Password */}
          <TextInputField
            label="Password"
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Enter your password"
            isInvalid={!!getError('password')}
            validationMessage={getError('password')}
          />
          
          {/* Submit Button */}
          <Pane display='flex' justifyContent='center' alignItems='center' marginTop={majorScale(6)}>
            <Button appearance='minimal' backgroundColor='yellowTint' type="submit">Login</Button>
          </Pane>
          
          {/* Server Error */}
          {getError('server') && (
            <Alert intent="danger" title={getError('server')} marginTop={majorScale(2)} />
          )}
        </Form>
      </Pane>
    </Pane>
  );
}

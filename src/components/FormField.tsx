import { useId } from 'react'

type FormFieldProps = {
  label: string
  name: string
  type?: string
  error?: string
}

export default function FormField({ label, name, type = 'text', error }: FormFieldProps) {
  const id = useId()

  return (
    <div>
      <label htmlFor={id} className="block font-medium">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className={`block w-full border p-2 rounded ${error ? 'border-red-500' : 'border-gray-300'}`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}

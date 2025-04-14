import { Text, TextInput, Pane, majorScale, minorScale, InlineAlert } from "evergreen-ui"
import React from "react"

type CustomTextInputFieldProps = {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
  isInvalid?: boolean
  validationMessage?: string
  fontSize?: number
  labelFontSize?: number
  inputHeight?: number
}

const CustomTextInputField: React.FC<CustomTextInputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  isInvalid = false,
  validationMessage,
  fontSize = majorScale(2),
  inputHeight = minorScale(9),
}) => {
  return (
    <Pane 
      marginBottom={minorScale(9)}>
      <Text
        fontSize={fontSize}
        fontWeight={500}
        marginBottom={majorScale(1)}
        display="block"
      >
        {label}
      </Text>
      <TextInput
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        isInvalid={isInvalid}
        fontSize={fontSize}
        height={inputHeight}
        width="100%"
      />
      {isInvalid && validationMessage && (
        <InlineAlert intent="danger" size={16} marginTop={majorScale(1)}>
          {validationMessage}
        </InlineAlert>
      )}
    </Pane>
  )
}

export default CustomTextInputField

import { Form, useLoaderData, useActionData, useNavigation, useParams } from "react-router";
import { UserUpdate } from "../types/api";
import { useState } from "react";
import { Pane, Heading, TextInputField, SelectField, Button, Alert, majorScale, minorScale } from "evergreen-ui";
import ChangePasswordButton from "../components/ChangePasswordButton";

type UserProfileActionData = {
  errors?: Record<string, string>;
  message?: string;
};

export default function UserProfile() {
  const user = useLoaderData() as UserUpdate;
  const actionData = useActionData() as UserProfileActionData | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { username } = useParams();

  const [formData, setFormData] = useState<UserUpdate>(user);

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  }

  return (
    <Pane display='flex' flexDirection='column' justifyContent='center' alignItems='center' paddingTop={majorScale(5)} gap={0}>
      <Pane display='flex' justifyContent='center' alignItems='center' background='yellow100' width='60%' maxWidth={500} height={50} elevation={1}>
        <Heading size={700} marginBottom={0} background='yellow100'>Profile</Heading>
      </Pane>
      <Pane width='60%' maxWidth={500} marginX='auto' marginTop={0} padding={majorScale(3)} borderBottomLeftRadius={minorScale(1)} borderBottomRightRadius={minorScale(1)} elevation={1} background='white'>
        {actionData?.message && <Alert intent="danger" title={actionData.message} marginBottom={majorScale(2)} />}
        <Form method="post">
          <TextInputField label="First Name" name="firstName" value={formData.firstName || ""} onChange={handleChange} isInvalid={!!actionData?.errors?.firstName} validationMessage={actionData?.errors?.firstName} />
          <TextInputField label="Last Name" name="lastName" value={formData.lastName || ""} onChange={handleChange} isInvalid={!!actionData?.errors?.lastName} validationMessage={actionData?.errors?.lastName} />
          <TextInputField label="Email" name="email" type="email" value={formData.email || ""} onChange={handleChange} isInvalid={!!actionData?.errors?.email} validationMessage={actionData?.errors?.email} />
          <TextInputField label="Age" name="age" type="number" value={formData.age || ""} onChange={handleChange} isInvalid={!!actionData?.errors?.age} validationMessage={actionData?.errors?.age} />
          <SelectField label="Gender" name="gender" value={formData.gender || "UNKNOWN"} onChange={handleChange} isInvalid={!!actionData?.errors?.gender} validationMessage={actionData?.errors?.gender}>
            <option value="UNKNOWN">Select</option>
            <option value="FEMALE">Female</option>
            <option value="MALE">Male</option>
            <option value="OTHER">Other</option>
          </SelectField>
          <TextInputField label="Province" name="province" value={formData.address?.province || ""} onChange={handleAddressChange} isInvalid={!!actionData?.errors?.province} validationMessage={actionData?.errors?.province} />
          <TextInputField label="District" name="district" value={formData.address?.district || ""} onChange={handleAddressChange} isInvalid={!!actionData?.errors?.district} validationMessage={actionData?.errors?.district} />
          <TextInputField label="Street and Number" name="streetAndNumber" value={formData.address?.streetAndNumber || ""} onChange={handleAddressChange} isInvalid={!!actionData?.errors?.streetAndNumber} validationMessage={actionData?.errors?.streetAndNumber} />
          <Pane display='flex' justifyContent='center' alignItems='center' marginTop={majorScale(6)} gap={majorScale(2)}>
            <Button appearance='minimal' backgroundColor='yellowTint'  type="submit" isLoading={isSubmitting}>{isSubmitting ? "Updating..." : "Update Profile"}</Button>
            <ChangePasswordButton username={username || "defaultUsername"} />
          </Pane>
        </Form>
      </Pane>
    </Pane>
  );
}

import { Form, useLoaderData, useActionData, useNavigation, useParams } from "react-router";
import { UserUpdate } from "../types/api";
import { useState } from "react";
import ChangePasswordButton from "../components/ChangePasswordButton";

type UserProfileActionData = {
  errors?: Record<string, string>; // Field-specific errors
  message?: string; // General error message
}

export default function UserProfile() {
  const user = useLoaderData() as UserUpdate;
  const actionData = useActionData() as UserProfileActionData | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { username } = useParams()

  console.log('This is from the UserProfile, username: ', username)

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
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
      {actionData?.message && <p className="text-red-500">{actionData.message}</p>}
      
      <Form method="post" className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName || ""}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {actionData?.errors?.firstName && <p className="text-red-500">{actionData.errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label className="block">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName || ""}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {actionData?.errors?.lastName && <p className="text-red-500">{actionData.errors.lastName}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {actionData?.errors?.email && <p className="text-red-500">{actionData.errors.email}</p>}
        </div>

        {/* Age */}
        <div>
          <label className="block">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age || ""}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          {actionData?.errors?.age && <p className="text-red-500">{actionData.errors.age}</p>}
        </div>

        {/* Gender */}
        <div>
          <label className="block">Gender</label>
          <select name="gender" value={formData.gender || "UNKNOWN"} onChange={handleChange} className="border p-2 w-full">
            <option value="UNKNOWN">Select</option>
            <option value="FEMALE">Female</option>
            <option value="MALE">Male</option>
            <option value="OTHER">Other</option>
          </select>
          {actionData?.errors?.gender && <p className="text-red-500">{actionData.errors.gender}</p>}
        </div>

        {/* Address */}
        <div>
          <label className="block">Province</label>
          <input
            type="text"
            name="province"
            value={formData.address?.province || ""}
            onChange={handleAddressChange}
            className="border p-2 w-full"
          />
          {actionData?.errors?.province && <p className="text-red-500">{actionData.errors.province}</p>}
        </div>

        <div>
          <label className="block">District</label>
          <input
            type="text"
            name="district"
            value={formData.address?.district || ""}
            onChange={handleAddressChange}
            className="border p-2 w-full"
          />
          {actionData?.errors?.district && <p className="text-red-500">{actionData.errors.district}</p>}
        </div>

        <div>
          <label className="block">Street and Number</label>
          <input
            type="text"
            name="streetAndNumber"
            value={formData.address?.streetAndNumber || ""}
            onChange={handleAddressChange}
            className="border p-2 w-full"
          />
          {actionData?.errors?.streetAndNumber && <p className="text-red-500">{actionData.errors.streetAndNumber}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isSubmitting ? "Updating..." : "Update Profile"}
        </button>
      </Form>
      <ChangePasswordButton username={username || "defaultUsername"} />
    </div>
  );
}
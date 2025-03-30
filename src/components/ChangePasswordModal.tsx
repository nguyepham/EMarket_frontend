import { useState, useEffect, useRef } from "react";
import { Form, useActionData, useNavigation, useNavigate, useFetcher } from "react-router";
import { Pane, Heading, TextInputField, Button, Alert, majorScale, minorScale } from "evergreen-ui";

interface ChangePasswordModalProps {
  onClose: () => void;
  username: string;
}

type ValidationError = {
  field: string;
  message: string;
};

type ActionData = {
  errors?: ValidationError[];
  success?: boolean;
};

const ChangePasswordModal = ({ onClose, username }: ChangePasswordModalProps) => {
  const actionData = useActionData() as ActionData;
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log('HandleSubmit called');
    e.preventDefault();
    setErrors({});
    setSuccess("");
    setIsSubmitting(true);
    console.log('This is from ChangePasswordModal 1111:\nformData: ', formData);
    
    if (formData.newPassword !== formData.confirmPassword) {
      setErrors({ confirmPassword: "New passwords do not match" });
      setIsSubmitting(false);
      return;
    }

    console.log('This is from ChangePasswordModal:\nformData: ', formData);
    
    const formDataObj = new FormData();
    formDataObj.append("oldPassword", formData.oldPassword);
    formDataObj.append("newPassword", formData.newPassword);

    fetcher.submit(formDataObj, { method: "POST", action: `/user/${username}/details/update-password` });
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      setIsSubmitting(false);
      if (fetcher.data.errors) {
        const errorObj = fetcher.data.errors.reduce((acc: Record<string, string>, err: { field: string; message: string }) => {
          acc[err.field] = err.message;
          return acc;
        }, {});
        setErrors(errorObj);
      } else {
        console.log('This is from ChangePasswordModal:\nfetcher.data: ', fetcher.data);
        if (fetcher.data.success) {
        setSuccess("Password updated successfully");
        setTimeout(() => {
          localStorage.removeItem("jwt");

          navigate("/auth/login", { replace: true });
          onClose();
        }, 2000);
        }
      }
    }
  }, [fetcher.state, fetcher.data, onClose]);

  return (
    <Pane position="fixed" top={0} left={0} right={0} bottom={0} display="flex" alignItems="center" justifyContent="center" background="rgba(0,0,0,0.5)">
      <Pane width="60%" maxWidth={500} background="white" padding={majorScale(3)} borderRadius={minorScale(1)} elevation={3}>
        <Heading size={700} marginBottom={majorScale(2)} textAlign="center">Change Password</Heading>
        {actionData?.success && <Alert intent="success" title="Password updated successfully" marginBottom={majorScale(2)} />}

        <form>
          <TextInputField
            label="Current Password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            type="password"
            ref={firstInputRef}
            isInvalid={!!errors.oldPassword}
            validationMessage={errors.oldPassword}
          />
          <TextInputField
            label="New Password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            type="password"
            isInvalid={!!errors.newPassword}
            validationMessage={errors.newPassword}
          />
          <TextInputField
            label="Confirm New Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            isInvalid={!!errors.confirmPassword}
            validationMessage={errors.confirmPassword}
          />
          {errors.server && <Alert intent="danger" title={errors.server} marginBottom={majorScale(2)} />}
          <Pane display="flex" justifyContent="center" alignItems="center" marginTop={majorScale(3)} gap={majorScale(2)}>
            <Button appearance="minimal" onClick={onClose} disabled={isSubmitting}>Cancel</Button>
            <Button appearance="primary" onClick={handleSubmit} isLoading={isSubmitting}>{isSubmitting ? "Updating..." : "Update"}</Button>
          </Pane>
        </form>
      </Pane>
    </Pane>
  );
};

export default ChangePasswordModal;
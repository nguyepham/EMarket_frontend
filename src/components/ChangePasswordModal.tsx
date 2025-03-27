import { useState, useEffect } from "react";
import { useFetcher, useNavigate } from "react-router";

interface ChangePasswordModalProps {
  onClose: () => void;
  username: string;
}

const ChangePasswordModal = ({ onClose, username }: ChangePasswordModalProps) => {
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
    e.preventDefault();
    setErrors({});
    setSuccess("");
    setIsSubmitting(true);
    
    if (formData.newPassword !== formData.confirmPassword) {
      setErrors({ confirmPassword: "New passwords do not match" });
      setIsSubmitting(false);
      return;
    }
    
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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        {success && <p className="text-green-500 text-sm mb-2">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="password"
              name="oldPassword"
              placeholder="Current Password"
              className="w-full p-2 border rounded mb-1"
              value={formData.oldPassword}
              onChange={handleChange}
              required
            />
            {errors.oldPassword && <p className="text-red-500 text-sm mb-2">{errors.oldPassword}</p>}
          </div>
          <div>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              className="w-full p-2 border rounded mb-1"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
            {errors.newPassword && <p className="text-red-500 text-sm mb-2">{errors.newPassword}</p>}
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              className="w-full p-2 border rounded mb-1"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mb-2">{errors.confirmPassword}</p>}
          </div>
          {errors.server && <p className="text-red-500 text-sm mb-2">{errors.server}</p>}
          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;

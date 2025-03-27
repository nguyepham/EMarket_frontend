import { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";

const ChangePasswordButton = ({ username }: { username: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Change Password
      </button>

      {isModalOpen && (
        <ChangePasswordModal
          onClose={() => setIsModalOpen(false)}
          username={username}
        />
      )}
    </>
  );
};

export default ChangePasswordButton;

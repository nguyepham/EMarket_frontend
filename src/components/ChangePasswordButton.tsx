import { useEffect, useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import { Button } from "evergreen-ui";
import UpdatePasswordModal from "./ChangePasswordModal";

const ChangePasswordButton = ({ username }: { username: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("isModalOpen changed:", isModalOpen);
  }, [isModalOpen]);
  
  return (
    <>
      <Button appearance='minimal' backgroundColor='yellowTint'
        onClick={() => {setIsModalOpen(true); console.log("Opening modal...");}}
      >
        Change Password
      </Button>

      {isModalOpen && (
        <ChangePasswordModal
          onClose={() => {setIsModalOpen(false); console.log("onClose triggered")}}
          username={username}
        />
      )}
    </>
  );
};

export default ChangePasswordButton;

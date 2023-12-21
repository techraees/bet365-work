import { useState } from "react";
import { Modal } from "antd";
import clsx from "clsx";

import { useModalContext } from "../../../../contexts/ModalContext";
import Input from "../../../ui/Input";

const ModalChangePassword = ({ item }: any) => {
  const {
    isChangePasswordModalOpen,
    closeChangePasswordModal,
    openUserInfoModal,
  } = useModalContext();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onHandleConfirm = () => {
    setNewPassword("");
    setConfirmPassword("");
    closeChangePasswordModal();
    openUserInfoModal();
  };

  const onHandleClose = () => {
    setNewPassword("");
    setConfirmPassword("");
    closeChangePasswordModal();
    openUserInfoModal();
  };

  return (
    <>
      <Modal
        title={"User - " + item?.username}
        open={isChangePasswordModalOpen}
        onCancel={onHandleClose}
        footer={[
          <div key="confirm" className="flex justify-center">
            <button
              className={clsx(
                "px-4 py-1.5 rounded-md",
                newPassword === "" || confirmPassword === ""
                  ? "bg-brand-disabled-dialog-button"
                  : "bg-brand-dialog-button"
              )}
              disabled={newPassword === "" || confirmPassword === "" ? true : false}
              onClick={onHandleConfirm}
            >
              Confirm
            </button>
          </div>,
        ]}
      >
        <section className="flex flex-col bg-brand-dialog items-center px-4 pt-4">
          <div className="flex gap-6 items-center justify-center h-10 w-full">
            <p className="w-full text-right m-auto text-white">New Password:</p>
            <div className="w-full m-auto">
              <input
                type="text"
                className="bg-white border-gray-300 w-full h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-black"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-6 items-center justify-center h-10 w-full">
            <p className="w-full text-right m-auto text-white">
              Confirm Password:
            </p>
            <div className="w-full m-auto">
              <input
                type="text"
                className="bg-white border-gray-300 w-full h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-black"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        </section>
      </Modal>
    </>
  );
};

export default ModalChangePassword;

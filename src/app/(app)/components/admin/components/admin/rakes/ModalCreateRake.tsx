import { useState } from "react";
import { Modal } from "antd";
import clsx from "clsx";

import { useModalContext } from "../../../contexts/ModalContext";
import Input from "../../ui/Input";

const ModalCreateRake = () => {
  const { isCreateRakeModalOpen, closeCreateRakeModal } = useModalContext();
  const [rakeName, setRakeName] = useState("");
  const [rtp, setRtp] = useState("");

  const onHandleConfirm = () => {
    setRakeName("");
    setRtp("");
    closeCreateRakeModal();
  };

  const onHandleClose = () => {
    setRakeName("");
    setRtp("");
    closeCreateRakeModal();
  };

  return (
    <Modal
      title="Create Rake"
      open={isCreateRakeModalOpen}
      onCancel={onHandleClose}
      footer={[
        <div key="confirm" className="flex justify-center">
          <button
            className={clsx(
              "px-4 py-1.5 rounded-md",
              rakeName === "" || rtp === ""
                ? "bg-brand-disabled-dialog-button"
                : "bg-brand-dialog-button"
            )}
            disabled={rakeName === "" || rtp === "" ? true : false}
            onClick={onHandleConfirm}
          >
            Confirm
          </button>
        </div>,
      ]}
    >
      <section className="flex flex-col bg-brand-dialog items-center px-4 pt-4">
        <div className="flex gap-6 items-center justify-center h-10 w-full">
          <p className="w-full text-right m-auto text-white">Rake Name:</p>
          <div className="w-full m-auto">
            <Input
              className="bg-white border-gray-300 w-full h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-black"
              placeholder=""
              value={rakeName}
              disable_value={false}
              onHandleChange={(value: string) => setRakeName(value)}
            />
          </div>
        </div>
        <div className="flex gap-6 items-center justify-center h-10 w-full">
          <p className="w-full text-right m-auto text-white">RTP %:</p>
          <div className="w-full m-auto">
            <Input
              className="bg-white border-gray-300 w-full h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-black"
              placeholder=""
              value={rtp}
              disable_value={false}
              onHandleChange={(value: string) => setRtp(value)}
            />
          </div>
        </div>
      </section>
    </Modal>
  );
};

export default ModalCreateRake;

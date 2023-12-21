import { useState } from "react";
import { Modal } from "antd";
import clsx from "clsx";

import { useModalContext } from "../../../contexts/ModalContext";
import Input from "../../ui/Input";

const ModalTaxesSettings = ({ name }: { name: string; }) => {
  const { isTaxesSettingsModalOpen, closeTaxesSettingsModal } = useModalContext();
  const [percent, setPercent] = useState(0);

  const onHandleSave = () => {
    setPercent(0);
    closeTaxesSettingsModal();
  };

  const onHandleClose = () => {
    setPercent(0);
    closeTaxesSettingsModal();
  };

  return (
    <Modal
      title={"Tax " + name}
      open={isTaxesSettingsModalOpen}
      onCancel={onHandleClose}
      footer={[
        <div key="save" className="flex gap-2 justify-center">
          <button
            className={clsx(
              "px-4 py-1.5 rounded-md bg-green-700 hover:bg-green-600",
              percent === 0 
                ? "bg-brand-disabled-dialog-button"
                : "bg-brand-dialog-button"
            )}
            disabled={percent === 0 ? true : false}
            onClick={onHandleSave}
          >
            Save
          </button>
          <button
            className="px-4 py-1.5 rounded-md bg-brand-dialog-button"
            onClick={onHandleClose}
          >
            Close
          </button>
        </div>,
      ]}
    >
      <section className="flex flex-col bg-brand-dialog items-center px-4 pt-4">
        <div className="flex gap-6 items-center justify-center h-10 w-full">
          <p className="w-full text-right m-auto text-white">Percent:</p>
          <div className="w-full m-auto">
            <Input
              className="bg-white border-gray-300 text-center w-24 h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-black"
              placeholder=""
              value={percent}
              disable_value={false}
              onHandleChange={(value: number) => setPercent(value)}
            />
          </div>
        </div>
      </section>
    </Modal>
  );
};

export default ModalTaxesSettings;

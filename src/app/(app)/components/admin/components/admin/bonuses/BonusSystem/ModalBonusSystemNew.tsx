"use client";

import { useState } from "react";
import { Modal } from "antd";
import { useModalContext } from "@/app/(app)/components/admin/contexts/ModalContext";
import Input from "../../../ui/Input";

function ModalBonusSystemNew() {
  const { isBonusSystemNewModalOpen, closeBonusSystemNewModal } =
    useModalContext();
  const [type, setType] = useState("Loyalty");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [active, setActive] = useState(true);
  const [description, setDescription] = useState("");

  return (
    <Modal
      title="Bonus - New"
      open={isBonusSystemNewModalOpen}
      onCancel={closeBonusSystemNewModal}
      footer={[
        <div key="close" className="flex gap-2 justify-center">
          <button
            className="px-4 py-1.5 rounded-md bg-green-700 hover:bg-green-600 text-white"
            onClick={closeBonusSystemNewModal}
          >
            Save
          </button>
          <button
            className="px-4 py-1.5 rounded-md bg-brand-dialog-button"
            onClick={closeBonusSystemNewModal}
          >
            Close
          </button>
        </div>,
      ]}
    >
      <section className="flex flex-col gap-2 w-full p-4">
        <div className="flex gap-6 items-center">
          <p className="text-sm text-end text-white w-1/4">Type:</p>
          <div className="w-full m-auto">
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block w-full focus:ring-0 focus:border-gray-300"
              defaultValue={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Loyalty">Loyalty</option>
              <option value="Deposit">Deposit</option>
              <option value="Register">Register</option>
            </select>
          </div>
        </div>
        <div className="flex gap-6 items-center">
          <p className="text-sm text-end text-white w-1/4">Name:</p>
          <Input
            className="bg-white border-gray-300 w-full h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-sm"
            placeholder="Name"
            disable_value={false}
            value={name}
            onHandleChange={(e: any) => setName(e.target.value)}
          />
        </div>
        <div className="flex gap-6 items-center">
          <p className="text-sm text-end text-white w-1/4">Title:</p>
          <Input
            className="bg-white border-gray-300 w-full h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-sm"
            placeholder="Name"
            disable_value={false}
            value={title}
            onHandleChange={(e: any) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex gap-6 items-center">
          <p className="text-sm text-end text-white w-1/4">Active:</p>
          <div className="w-full">
            <input
              type="checkbox"
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
              onChange={() => setActive(!active)}
            />
          </div>
        </div>
        <textarea
          className="w-full h-24 p-2 focus:outline-none focus:ring-0 text-black bg-white"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </section>
    </Modal>
  );
}

export default ModalBonusSystemNew;

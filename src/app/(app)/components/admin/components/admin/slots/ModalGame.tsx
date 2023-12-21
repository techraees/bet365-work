import { useState, useEffect } from "react";
import { Modal } from "antd";

import { useModalContext } from "../../../contexts/ModalContext";
import Input from "../../ui/Input";

const ModalGame = ({ item }: { item: any }) => {
  const { isGameModalOpen, closeGameModal } = useModalContext();
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [order, setOrder] = useState(0);

  useEffect(() => {
    if (item !== null) {
      setName(item.name);
      setImageUrl(item.image_url);
      setOrder(item.order);
    }
  }, [item])

  const onHandleSave = () => {
    setName("");
    setImageUrl("");
    setOrder(0);
    closeGameModal();
  };

  const onHandleClose = () => {
    setName("");
    setImageUrl("");
    setOrder(0);
    closeGameModal();
  };

  return (
    <Modal
      title={"Game: " + item?.name}
      open={isGameModalOpen}
      onCancel={onHandleClose}
      footer={[
        <div key="save" className="flex gap-2 justify-center">
          <button
            className="px-4 py-1.5 rounded-md bg-green-700 hover:bg-green-600"
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
          <p className="w-full text-right m-auto text-white">Name:</p>
          <div className="w-full m-auto">
            <Input
              className="w-full bg-white border-gray-300 h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-black"
              placeholder=""
              value={name}
              disable_value={false}
              onHandleChange={(value: string) => setName(value)}
            />
          </div>
        </div>
        <div className="flex gap-6 items-center justify-center h-10 w-full">
          <p className="w-full text-right m-auto text-white">Image:</p>
          <div className="w-full m-auto">
            <Input
              className="w-full bg-white border-gray-300 h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-black"
              placeholder=""
              value={imageUrl}
              disable_value={false}
              onHandleChange={(value: string) => setImageUrl(value)}
            />
          </div>
        </div>
        <div className="flex gap-6 items-center justify-center h-10 w-full">
          <p className="w-full text-right m-auto text-white">Order:</p>
          <div className="w-full m-auto">
            <Input
              className="w-full bg-white border-gray-300 h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-black"
              placeholder=""
              value={order}
              disable_value={false}
              onHandleChange={(value: number) => setOrder(value)}
            />
          </div>
        </div>
      </section>
    </Modal>
  );
};

export default ModalGame;

"use client";

import { Modal } from "antd";

import { useModalContext } from "../../../../contexts/ModalContext";

function ModalLocation({ item }: { item: any }) {
  const { isLocationModalOpen, closeLocationModal } = useModalContext();

  const onHandleClose = () => {
    closeLocationModal();
  };

  return (
    <div>
      {item !== null && (
        <Modal
        className="modal-location"
          title={"Location (" + item.username + ")"}
          open={isLocationModalOpen}
          onCancel={onHandleClose}
          footer={[
            <div key="close" className="flex justify-center">
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
            <div className="w-full overflow-x-scroll md:overflow-hidden">
              <table className="w-full text-sm text-gray-400 text-center">
                <thead className="text-sm, bg-brand-yellow text-black">
                  <tr>
                    <th
                      scope="col"
                      className="py-1.5 border border-gray-600"
                    >
                      Ip
                    </th>
                    <th
                      scope="col"
                      className="py-1.5 border border-gray-600"
                    >
                      City
                    </th>
                    <th scope="col" className="py-1.5 border border-gray-600">
                      Platform
                    </th>
                    <th scope="col" className="py-1.5 border border-gray-600">
                      Device
                    </th>
                    <th scope="col" className="py-1.5 border border-gray-600">
                      Browser
                    </th>
                    <th scope="col" className="py-1.5 border border-gray-600">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </section>
        </Modal>
      )}
    </div>
  );
}

export default ModalLocation;

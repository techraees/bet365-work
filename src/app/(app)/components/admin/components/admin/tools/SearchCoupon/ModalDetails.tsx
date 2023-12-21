"use client";
import { useState } from "react";
import { Modal } from "antd";
import { useModalContext } from "../../../../contexts/ModalContext";
import ModalDetailView from "./ModalDetailView";

function ModalDetails({ item }: any) {
  const { isDetailsModalOpen, closeDetailsModal, openDetailViewModal } =
    useModalContext();
  const [type, setType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const onHandleDetailView = (type_: string, data: any) => {
    setType(type_);
    setSelectedItem(data);
    closeDetailsModal();
    openDetailViewModal();
  }

  const onHandleClose = () => {
    closeDetailsModal();
  };

  return (
    <>
      <Modal
        className="modal-details-coupon"
        title="Details"
        open={isDetailsModalOpen}
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
        <section className="px-4">
          <section className="flex flex-col gap-2 bg-brand-dialog items-start pt-4">
            {item !== null && (
              <section className="w-full overflow-x-scroll md:overflow-hidden">
                <table className="w-full text-sm text-gray-400 text-center">
                  <thead className="text-sm bg-[#777] text-white">
                    <tr>
                      <th
                        scope="col"
                        className="px-2 py-1.5 border border-gray-600 truncate"
                      >
                        Game Id
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1.5 border border-gray-600 truncate"
                      >
                        Game Name
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1.5 border border-gray-600 truncate"
                      >
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-[#777] text-white text-xs">
                    <tr>
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.game_id}
                      </td>
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.event_name}
                      </td>
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        <div className="flex">
                          <button type="button" className="px-4 py-2 bg-green-700 hover:bg-green-500 text-brand-button-text hover:text-white" onClick={() => onHandleDetailView("Score", score_data)}>Score</button>
                          <button type="button" className="px-4 py-2 bg-green-700 hover:bg-green-500 text-brand-button-text hover:text-white" onClick={() => onHandleDetailView("Corners", corner_data)}>Corners</button>
                          <button type="button" className="px-4 py-2 bg-green-700 hover:bg-green-500 text-brand-button-text hover:text-white" onClick={() => onHandleDetailView("Yellow cards", yellow_card_data)}>Yellow cards</button>
                          <button type="button" className="px-4 py-2 bg-green-700 hover:bg-green-500 text-brand-button-text hover:text-white" onClick={() => onHandleDetailView("Red cards", red_card_data)}>Red cards</button>
                          <button type="button" className="px-4 py-2 bg-green-700 hover:bg-green-500 text-brand-button-text hover:text-white" onClick={() => onHandleDetailView("Penalties", penalty_data)}>penalties</button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            )}
          </section>
        </section>
      </Modal>
      <ModalDetailView type={type} data={selectedItem} />
    </>
  );
}

export default ModalDetails;

const score_data = [
  {
    time: "03:37:01",
    score: "1:0",
    minute: "6"
  },
  {
    time: "03:54:02",
    score: "1:1",
    minute: "24"
  },
  {
    time: "04:01:02",
    score: "2:1",
    minute: "31"
  },
  {
    time: "04:11:02",
    score: "3:1",
    minute: "40"
  }
];

const corner_data = [
  {
    time: "03:37:01",
    score: "1:0",
    minute: "6"
  },
  {
    time: "03:54:02",
    score: "1:1",
    minute: "20"
  },
  {
    time: "04:01:02",
    score: "2:1",
    minute: "30"
  },
  {
    time: "04:11:02",
    score: "2:4",
    minute: "60"
  }
];

const yellow_card_data = [
  {
    time: "03:37:01",
    score: "1:0",
    minute: "23"
  },
  {
    time: "03:54:02",
    score: "1:1",
    minute: "44"
  },
  {
    time: "04:01:02",
    score: "1:3",
    minute: "72"
  },
  {
    time: "04:11:02",
    score: "1:4",
    minute: "89"
  }
];

const red_card_data = [
  {}
];

const penalty_data = [
  {
    time: "03:37:01",
    score: "1:0",
    minute: "23"
  }
];
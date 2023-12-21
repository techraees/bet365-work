"use client";
import { useState } from "react";
import clsx from "clsx";
import { Modal } from "antd";
import { useModalContext } from "../../../../contexts/ModalContext";

function ModalDetailView({ type, data }: { type: string; data: any }) {
  const { isDetailViewModalOpen, closeDetailViewModal, openDetailsModal } =
    useModalContext();

  const onHandleClose = () => {
    closeDetailViewModal();
    openDetailsModal();
  };

  return (
    <>
      <Modal
        title={"Details - " + type}
        open={isDetailViewModalOpen}
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
            {data?.length === 0 ? (
              <div className="flex items-center justify-center w-full h-[300px] m-auto text-lg font-bold text-center text-brand-no-result">No result</div>
            ) : (
              <section className="w-full overflow-x-scroll md:overflow-hidden">
                <table className="w-full text-sm text-gray-400 text-center">
                  <thead className="text-sm bg-[#777] text-white">
                    <tr>
                      <th
                        scope="col"
                        className="px-2 py-1.5 border border-gray-600 truncate"
                      >
                        Time
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1.5 border border-gray-600 truncate"
                      >
                        {type}
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1.5 border border-gray-600 truncate"
                      >
                        Minute
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-[#777] text-white text-xs">
                    {data?.map((item: any, index: number) => {
                      return (
                        <tr key={index}>
                          <td className="px-2 py-1 border border-gray-600 truncate">
                            {item.time}
                          </td>
                          <td className="px-2 py-1 border border-gray-600 truncate">
                            {item.score}
                          </td>
                          <td className="px-2 py-1 border border-gray-600 truncate">
                            {item.minute}&apos;
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </section>
            )}
          </section>
        </section>
      </Modal>
    </>
  );
}

export default ModalDetailView;

import { Modal } from "antd";

import { useModalContext } from "../../../../contexts/ModalContext";

const ModalBonusPrime = ({
  tableList,
  userName,
}: {
  tableList: any;
  userName: string;
}) => {
  const { isBonusPrimeModalOpen, closeBonusPrimeModal } = useModalContext();

  return (
    <Modal
      title={userName !== "" ? "Bonus Prime: " + userName : "Bonus Prime"}
      open={isBonusPrimeModalOpen}
      onCancel={closeBonusPrimeModal}
      footer={[
        <div key="Add" className="flex gap-2 justify-center">
          <button
            className="px-4 py-1.5 rounded-md bg-[#333] text-brand-light-grey"
            onClick={closeBonusPrimeModal}
          >
            Add
          </button>
          <button
            className="px-4 py-1.5 rounded-md bg-[#333] text-brand-light-grey"
            onClick={closeBonusPrimeModal}
          >
            Close
          </button>
        </div>,
      ]}
    >
      <section className="flex flex-col gap-4 bg-brand-dialog items-center pt-4 px-4">
        <section className="w-full overflow-x-scroll md:overflow-hidden">
          <table className="w-full text-sm text-gray-400 text-center">
            <thead className="text-sm bg-brand-yellow text-black">
              <tr>
                <th
                  scope="col"
                  className="px-2 py-1.5 border border-gray-600 truncate"
                >
                </th>
                <th
                  scope="col"
                  className="px-2 py-1.5 border border-gray-600 truncate"
                >
                  Games
                </th>
                <th
                  scope="col"
                  className="px-2 py-1.5 border border-gray-600 truncate"
                >
                  Min Odd
                </th>
                <th
                  scope="col"
                  className="px-2 py-1.5 border border-gray-600 truncate"
                >
                  Percent
                </th>
                <th
                  scope="col"
                  className="px-2 py-1.5 border border-gray-600 truncate"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </section>
      </section>
    </Modal>
  );
};

export default ModalBonusPrime;

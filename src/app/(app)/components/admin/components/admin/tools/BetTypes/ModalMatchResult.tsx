import { Modal } from "antd";

import { useModalContext } from "../../../../contexts/ModalContext";

const ModalMatchResult = () => {
  const { isMatchResultModalOpen, closeMatchResultModal } = useModalContext();

  return (
    <Modal
      title="Match Result (3-ways)"
      open={isMatchResultModalOpen}
      onCancel={closeMatchResultModal}
      footer={[
        <div key="Confirm" className="flex gap-2 justify-center">
          <button
            className="px-4 py-1.5 rounded-md bg-[#333] text-brand-light-grey"
            onClick={closeMatchResultModal}
          >
            Confirm
          </button>
          <button
            className="px-4 py-1.5 rounded-md bg-[#333] text-brand-light-grey"
            onClick={closeMatchResultModal}
          >
            Close
          </button>
        </div>,
      ]}
    >
      <section className="flex flex-col gap-4 bg-brand-dialog items-center pt-4 px-4">
        <table className="w-full text-sm text-white bg-[#666] text-center">
          <thead className="text-sm bg-brand-red">
            <tr>
              <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
                1
              </th>
              <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
                Main Markets
              </th>
            </tr>
          </thead>
          <tbody>
            {matchResultList.map((item: any, index: number) => {
              return (
                <tr key={index} className="cursor-pointer">
                  <td className="px-2 py-1.5 border border-gray-600 truncate">{item.id}</td>
                  <td className="px-2 py-1.5 border border-gray-600 truncate">{item.main_market}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </Modal>
  );
};

export default ModalMatchResult;

const matchResultList = [
  {
    id: 2,
    main_market: "Goal",
  },
  {
    id: 3,
    main_market: "Handicap",
  },
  {
    id: 4,
    main_market: "1st/2nd Half",
  },
  {
    id: 5,
    main_market: "Corners",
  },
  {
    id: 26,
    main_market: "Cards",
  },
  {
    id: 6,
    main_market: "Teams",
  },
  {
    id: 28,
    main_market: "Combo",
  },
  {
    id: 29,
    main_market: "Minutes",
  },
  {
    id: 7,
    main_market: "Scorers",
  },
  {
    id: 27,
    main_market: "Specials",
  },
];

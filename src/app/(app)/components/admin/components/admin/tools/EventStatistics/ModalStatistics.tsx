import { Modal } from "antd";

import { useModalContext } from "../../../../contexts/ModalContext";

const ModalStatistics = ({ item }: { item: any }) => {
  const { isStatisticsModalOpen, closeStatisticsModal } = useModalContext();

  return (
    <Modal
      className="modal-statistics"
      title={item?.games}
      open={isStatisticsModalOpen}
      onCancel={closeStatisticsModal}
      footer={[
        <div key="Save" className="flex gap-2 justify-center">
          <button
            className="px-4 py-1.5 rounded-md bg-[#999] text-black"
            onClick={closeStatisticsModal}
          >
            Save
          </button>
        </div>,
      ]}
    >
      {item !== null && (
        <section className="flex flex-col gap-4 bg-brand-dialog items-center pt-4 px-4">
          <section className="w-full overflow-x-auto md: overflow-hidden">
            <table className="w-full text-sm text-white bg-[#666] text-center">
              <thead className="text-sm bg-brand-yellow text-black">
                <tr>
                  <th
                    scope="col"
                    className="px-2 py-1.5 border border-gray-600 truncate"
                  >
                    date
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 border border-gray-600 truncate"
                  >
                    final score
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 border border-gray-600 truncate"
                  >
                    halftime score
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 border border-gray-600 truncate"
                  >
                    corners
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 border border-gray-600 truncate"
                  >
                    penalties
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 border border-gray-600 truncate"
                  >
                    yellow cards
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 border border-gray-600 truncate"
                  >
                    red cards
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 border border-gray-600 truncate"
                  >
                    status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="cursor-pointer">
                  <td className="px-2 py-1.5 border border-gray-600 truncate">
                    {totalStatisticsInfo.date}
                  </td>
                  <td className="px-2 py-1.5 border border-gray-600 bg-white text-black">
                    {totalStatisticsInfo.final_score}
                  </td>
                  <td className="px-2 py-1.5 border border-gray-600 bg-white text-black">
                    {totalStatisticsInfo.halftime_score}
                  </td>
                  <td className="px-2 py-1.5 border border-gray-600 bg-white text-black">
                    {totalStatisticsInfo.corners}
                  </td>
                  <td className="px-2 py-1.5 border border-gray-600 bg-white text-black">
                    {totalStatisticsInfo.penalties}
                  </td>
                  <td className="px-2 py-1.5 border border-gray-600 bg-white text-black">
                    {totalStatisticsInfo.yellow_cards}
                  </td>
                  <td className="px-2 py-1.5 border border-gray-600 bg-white text-black">
                    {totalStatisticsInfo.red_cards}
                  </td>
                  <td className="px-2 py-1.5 border border-gray-600 bg-white text-black">
                    {item.status}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
          <section className="flex justify-between pt-6">
            <button
              className="px-4 py-1.5 rounded-md bg-[#999] text-black"
              onClick={closeStatisticsModal}
            >
              Save
            </button>
          </section>
          <section className="w-full overflow-x-auto md: overflow-hidden pt-8">
            <table className="w-full text-sm text-white bg-[#666] text-center">
              <thead className="text-sm bg-brand-yellow text-black">
                <tr>
                  <th
                    scope="col"
                    className="px-2 py-1.5 border border-gray-600 truncate"
                  >
                    minute
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 border border-gray-600 truncate"
                  >
                    score
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 border border-gray-600 truncate"
                  >
                    corners
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 border border-gray-600 truncate"
                  >
                    penalties
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 border border-gray-600 truncate"
                  >
                    yellow cards
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 border border-gray-600 truncate"
                  >
                    red cards
                  </th>
                </tr>
              </thead>
              <tbody>
                {statisticsList.map((item: any, index: number) => {
                  return (
                    <tr key={index}>
                      <td className="px-2 py-1.5 border border-gray-600 truncate">
                        {item.minute}
                      </td>
                      <td className="px-2 py-1.5 border border-gray-600 bg-white text-black">
                        {item.score}
                      </td>
                      <td className="px-2 py-1.5 border border-gray-600 bg-white text-black">
                        {item.corners}
                      </td>
                      <td className="px-2 py-1.5 border border-gray-600 bg-white text-black">
                        {item.penalties}
                      </td>
                      <td className="px-2 py-1.5 border border-gray-600 bg-white text-black">
                        {item.yellow_cards}
                      </td>
                      <td className="px-2 py-1.5 border border-gray-600 bg-white text-black">
                        {item.red_cards}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        </section>
      )}
    </Modal>
  );
};

export default ModalStatistics;

const totalStatisticsInfo = {
  date: "2023-09-07",
  final_score: "3:0",
  halftime_score: "3:0",
  corners: "4:2",
  penalties: "0:0",
  yellow_cards: "1:2",
  red_cards: "0:0",
  status: "inprogress",
};

const statisticsList = [
  {
    minute: "1'",
    score: "0:0",
    corners: "0:0",
    penalties: "0:0",
    yellow_cards: "0:0",
    red_cards: "0:0",
  },
  {
    minute: "7'",
    score: "0:0",
    corners: "0:0",
    penalties: "0:0",
    yellow_cards: "0:0",
    red_cards: "0:0",
  },
  {
    minute: "11'",
    score: "0:0",
    corners: "0:0",
    penalties: "0:0",
    yellow_cards: "0:0",
    red_cards: "0:0",
  },
  {
    minute: "16'",
    score: "0:0",
    corners: "0:0",
    penalties: "0:0",
    yellow_cards: "0:0",
    red_cards: "0:0",
  },
  {
    minute: "17'",
    score: "0:0",
    corners: "0:0",
    penalties: "0:0",
    yellow_cards: "0:0",
    red_cards: "0:0",
  },
  {
    minute: "19'",
    score: "0:0",
    corners: "0:0",
    penalties: "0:0",
    yellow_cards: "0:0",
    red_cards: "0:0",
  },
  {
    minute: "29'",
    score: "0:0",
    corners: "0:0",
    penalties: "0:0",
    yellow_cards: "0:0",
    red_cards: "0:0",
  },
  {
    minute: "31'",
    score: "0:0",
    corners: "0:0",
    penalties: "0:0",
    yellow_cards: "0:0",
    red_cards: "0:0",
  },
  {
    minute: "35'",
    score: "0:0",
    corners: "0:0",
    penalties: "0:0",
    yellow_cards: "0:0",
    red_cards: "0:0",
  },
  {
    minute: "39'",
    score: "0:0",
    corners: "0:0",
    penalties: "0:0",
    yellow_cards: "0:0",
    red_cards: "0:0",
  },
  {
    minute: "43'",
    score: "0:0",
    corners: "0:0",
    penalties: "0:0",
    yellow_cards: "0:0",
    red_cards: "0:0",
  },
  {
    minute: "44'",
    score: "0:0",
    corners: "0:0",
    penalties: "0:0",
    yellow_cards: "0:0",
    red_cards: "0:0",
  },
];

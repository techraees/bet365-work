"use client";
import { Modal } from "antd";

import { useModalContext } from "../../../../contexts/ModalContext";

import { getEventStatistics } from "@/app/(app)/admin/api/events";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const ModalStatistics = ({ item }: { item: any }) => {
  const { data: session } = useSession();
  const { isStatisticsModalOpen, closeStatisticsModal } = useModalContext();
  const [eventStatistics, setEventStatistics] = useState<any>({});

  useEffect(() => {
    if (session === undefined) {
      return;
    }
    if (item === undefined) {
      return;
    }
    async function fetchEventStatistics() {
      try {
        const fetchedEventStatistics = await getEventStatistics(
          //@ts-ignore
          session?.user?.token,
          //@ts-ignore
          session?.user?.role,
          item.pregame_event_id
        );
        setEventStatistics(fetchedEventStatistics);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchEventStatistics();
  }, [session, item]);

  console.log({ eventStats: eventStatistics });
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
      {eventStatistics?.stats !== undefined && (
        <section className="flex flex-col gap-4 bg-brand-dialog items-center pt-4 px-4">
          <section className="w-full overflow-x-auto md: overflow-hidden">
            <table className="w-full text-sm text-white bg-[#666] text-center">
              <thead className="text-sm bg-brand-yellow text-black">
                <tr>
                  {Object.values(eventStatistics?.stats).map(
                    (item: any, index: any) => (
                      <th
                        key={index}
                        scope="col"
                        className="px-2 py-1.5 border border-gray-600 truncate"
                      >
                        {item.name}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                <tr className="cursor-pointer">
                  {Object.values(eventStatistics.stats).map(
                    (item: any, index: any) => (
                      <th
                        key={index}
                        scope="col"
                        className="px-2 py-1.5 border border-gray-600 bg-white text-black"
                      >
                        {item.home}:{item.away}
                      </th>
                    )
                  )}
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
                    Event
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.values(eventStatistics?.extra).map((item: any, index: number) => {
                  return (
                    <tr key={index}>
                      <td className="px-2 py-1.5 border border-gray-600 truncate">
                        {item.minute}
                      </td>
                      <td className="px-2 py-1.5 border border-gray-600 truncate">
                        {item.value}
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

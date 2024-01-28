"use client"
import { useEffect, useState } from "react";

import { useModalContext } from "../../../../contexts/ModalContext";
import ModalStatistics from "./ModalStatistics";
import EventStatisticsTableItem from "./EventStatisticsTableItem";

import { getEvents } from "@/app/(app)/admin/api/events";
import { useSession } from "next-auth/react";

interface EventStatisticsTableProps {
  tableList: Array<any>;
  currentPage: number;
  numberOfElementsPerPage:number;
}




const EventStatisticsTable = ({ tableList, currentPage, numberOfElementsPerPage }: EventStatisticsTableProps) => {
  const { openStatisticsModal } = useModalContext();
  const { data: session } = useSession();
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <section className="pt-4 w-full overflow-scroll md:overflow-hidden">
        {tableList?.length === 0 ? (
          <p className="text-lg font-bold text-center text-brand-button-text">
            No results
          </p>
        ) : (
          <table className="w-full text-sm text-gray-400 text-center">
            <thead className="text-sm bg-brand-yellow text-black">
              <tr>
                <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
                  Sport
                </th>
                <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
                  Pregame Event ID 
                </th>
                <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
                  Live Event ID 
                </th>
                <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
                  Start Date
                </th>
                <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
                  Game Name
                </th>
                <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
                  Status
                </th>
                <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tableList.map((item: any, index: number) => {
                if (index >= currentPage * numberOfElementsPerPage && index < (currentPage + 1) * numberOfElementsPerPage)
                  return (
                    <EventStatisticsTableItem
                      key={index}
                      item={item}
                      onHandleStatisticsClick={(item: any) => {
                        // console.log(item)
                        setSelectedItem(item);
                        openStatisticsModal();
                      }}
                    />
                  );
              })}
            </tbody>
          </table>
        )}
      </section>
      <ModalStatistics item={selectedItem} />
    </>
  );
};

export default EventStatisticsTable;

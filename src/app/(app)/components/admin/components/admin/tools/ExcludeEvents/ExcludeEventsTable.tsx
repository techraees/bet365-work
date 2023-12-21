import { useState } from "react";

import ExcludeEventsTableItem from "./ExcludeEventsTableItem";

interface ExcludeEventsTableProps {
  tableList: Array<any>;
  currentPage: number;
}

const ExcludeEventsTable = ({
  tableList,
  currentPage,
}: ExcludeEventsTableProps) => {
  const [selectedName, setSelectedName] = useState("");

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
                  Event
                </th>
                <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
                  Agent
                </th>
                <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
                  Time
                </th>
                <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tableList.map((item: any, index: number) => {
                if (index >= currentPage * 5 && index < (currentPage + 1) * 5)
                  return (
                    <ExcludeEventsTableItem
                      key={index}
                      item={item}
                      onHandleDeleteClick={(name: string) => {
                        setSelectedName(name);
                      }}
                    />
                  );
              })}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
};

export default ExcludeEventsTable;

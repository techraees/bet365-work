import { useState } from "react";

import GeneralTable from "./GeneralTable";
import UserTableItem from "./UserTableItem";

interface UserTableProps {
  parentId_: number;
  child: any;
  startingOn: string;
  endingOn: string;
  createTable: any;
  getChildren: any;
  removeChildren: any;
  addGeneralTable: any;
  removeGeneralTable: any;
}

const UserTable = ({
  parentId_,
  child,
  startingOn,
  endingOn,
  createTable,
  getChildren,
  removeChildren,
  addGeneralTable,
  removeGeneralTable,
}: UserTableProps) => {
  const [parentId, setParentId] = useState(parentId_);
  const [financialReportData, setFinancialReportData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="w-full overflow-x-scroll md:overflow-hidden">
      {child !== null && (
        <table className="w-full text-sm text-white text-center">
          <thead className="text-sm bg-[#222] uppercase">
            <tr>
              <th scope="col" className="px-2 py-1.5 border border-black"></th>
              <th scope="col" className="px-2 py-1.5 border border-black">
                {child !== null && child[0].role === "User"
                  ? "player"
                  : "agent"}
              </th>
              <th scope="col" className="px-2 py-1.5 border border-black">
                type
              </th>
              <th scope="col" className="px-2 py-1.5 border border-black">
                tax
              </th>
              <th scope="col" className="px-2 py-1.5 border border-black">
                ggr
              </th>
              <th scope="col" className="px-2 py-1.5 border border-black">
                t.o.
              </th>
              <th scope="col" className="px-2 py-1.5 border border-black">
                bonus
              </th>
              <th scope="col" className="px-2 py-1.5 border border-black">
                converted
              </th>
              <th scope="col" className="px-2 py-1.5 border border-black">
                ngr
              </th>
              <th scope="col" className="px-2 py-1.5 border border-black">
                hands
              </th>
              <th scope="col" className="px-2 py-1.5 border border-black">
                partner
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(child) === true &&
              child?.map((item: any, index: number) => {
                if (Array.isArray(item) === true) {
                  return (
                    <tr key={index} className="bg-brand-dark-grey">
                      {createTable(item, parentId + 1)}
                    </tr>
                  );
                } else {
                  if (item.generalTable === undefined) {
                    return (
                      <tr key={index} className="bg-brand-dark-grey">
                        <UserTableItem
                          item_={item}
                          startingOn={startingOn}
                          endingOn={endingOn}
                          getChildren={(username: string, id: number) => {
                            getChildren(username, id);
                          }}
                          removeChildren={removeChildren}
                          addGeneralTable={(username: string, financialReportData: any) => {
                            addGeneralTable(username);
                            setSelectedItem(item);
                            setFinancialReportData(financialReportData);
                          }}
                          removeGeneralTable={removeGeneralTable}
                        />
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={index} className="bg-brand-dark-grey">
                        <td colSpan={11} className="p-4 border border-black">
                          <GeneralTable item_={item} startingOn={startingOn} endingOn={endingOn} />
                        </td>
                      </tr>
                    );
                  }
                }
              })}
            {Array.isArray(child) === false && (
              <tr className="bg-[#666] text-white">
                <UserTableItem
                  item_={child}
                  startingOn={startingOn}
                  endingOn={endingOn}
                  getChildren={(username: string, id: number) => {
                    getChildren(username, id);
                  }}
                  removeChildren={removeChildren}
                  addGeneralTable={(username: string, financialReportData: any) => {
                    addGeneralTable(username);
                    setSelectedItem(child);
                    setFinancialReportData(financialReportData);
                  }}
                  removeGeneralTable={removeGeneralTable}
                />
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTable;

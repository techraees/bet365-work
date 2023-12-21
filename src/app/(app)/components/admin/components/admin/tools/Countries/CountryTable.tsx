import { useState } from "react";

import * as env from "@/app/env";
import { useModalContext } from "../../../../contexts/ModalContext";
import ModalTransalte from "../../../ui/ModalDialog/ModalTranslate";
import CountryTableItem from "./CountryTableItem";

interface CountriesTableProps {
  tableList: any;
  currentPage: number;
}

const CountriesTable = ({ tableList, currentPage }: CountriesTableProps) => {
  const { openTranslateModal } = useModalContext();

  const [selectedItem, setSelectedItem] = useState("");

  return (
    <>
      {tableList !== null && (
        <section className="pt-4 w-full overflow-scroll md:overflow-hidden">
          {tableList?.length === 0 ? (
            <p className="text-lg font-bold text-center text-brand-button-text">
              No results
            </p>
          ) : (
            <table className="w-full text-sm text-gray-400 text-center">
              <thead className="text-sm bg-brand-yellow text-black">
                <tr>
                  <th
                    scope="col"
                    className="px-2 py-1.5 border border-gray-600 truncate"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 border border-gray-600 truncate"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 border border-gray-600 truncate"
                  >
                    Order
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 border border-gray-600 truncate"
                  >
                    Group
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 border border-gray-600 truncate"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableList.map((item: any, index: number) => {
                  if (index >= currentPage * env.PAGE_ITEMCOUNT && index < (currentPage + 1) * env.PAGE_ITEMCOUNT)
                    return (
                      <CountryTableItem
                        key={index}
                        item={item}
                        onHandleTranslateClick={(item: any) => {
                          setSelectedItem(item);
                          openTranslateModal();
                        }}
                      />
                    );
                })}
              </tbody>
            </table>
          )}
        </section>
      )}
      <ModalTransalte item={selectedItem} />
    </>
  );
};

export default CountriesTable;

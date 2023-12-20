import { useState } from "react";
import clsx from "clsx";

import { useModalContext } from "@/contexts/ModalContext";
import BonusPrimeTableItem from "./BonusPrimeTableItem";

interface BonusPrimeTableProps {
  parentId_: number;
  child: any;
  createTable: any;
  getChildren: any;
  removeChildren: any;
  onHandleSetBonusClick: any;
};

const BonusPrimeTable = ({
  parentId_,
  child,
  createTable,
  getChildren,
  removeChildren,
  onHandleSetBonusClick
}: BonusPrimeTableProps) => {
  const [open, setOpen] = useState(false);
  const [parentId, setParentId] = useState(parentId_);
  const [selectedItem, setSelectedItem] = useState(false);

  return (
    <div className="w-full overflow-x-scroll md:overflow-hidden">
      <table className="w-full text-sm text-gray-400 text-center">
        <thead
          className={clsx(
            "text-sm",
            parentId === 0 ? "bg-brand-yellow text-black" : "bg-[#444]"
          )}
        >
          <tr>
            <th
              scope="col"
              className="px-2 py-1.5 border border-gray-600 truncate"
            >
              User
            </th>
            <th
              scope="col"
              className="px-2 py-1.5 border border-gray-600 truncate"
            >
              Type
            </th>
            <th
              scope="col"
              className="px-2 py-1.5 border border-gray-600 truncate"
            >
              Last Login
            </th>
            <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate"></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(child) === true &&
            child?.map((item: any, index: number) => {
              return (
                <tr key={index} className="bg-[#666] text-white">
                  {Array.isArray(item) === true &&
                    createTable(item, open, parentId + 1)}
                  {Array.isArray(item) === false && (
                    <BonusPrimeTableItem
                      item_={item}
                      getChildren={(username: string, id: number) => {
                        getChildren(username, id);
                      }}
                      removeChildren={removeChildren}
                      onHandleSetBonusClick={(name: string) => onHandleSetBonusClick(name)}
                    />
                  )}
                </tr>
              );
            })}
          {Array.isArray(child) === false && (
            <tr className="bg-[#666] text-white">
              <BonusPrimeTableItem
                item_={child}
                getChildren={(username: string, id: number) => {
                  getChildren(username, id);
                }}
                removeChildren={removeChildren}
                onHandleSetBonusClick={(name: string) => onHandleSetBonusClick(name)}
                />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BonusPrimeTable;

import { useState } from "react";
import clsx from "clsx";

import UserTableItem from "./UserTableItem";

interface UserTableProps {
  parentId_: number;
  child: any;
  createTable: any;
  getChildren: any;
  removeChildren: any;
  onHandleTransfer: any;
  onHandleBlock: any;
}

const UserTable = ({
  parentId_,
  child,
  createTable,
  getChildren,
  removeChildren,
  onHandleTransfer,
  onHandleBlock,
}: UserTableProps) => {
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
            <th scope="col" className="px-2 py-1.5 border border-gray-600">
              User
            </th>
            <th
              scope="col"
              className="max-sm:hidden px-2  py-1.5 border border-gray-600"
            >
              Type
            </th>
            <th scope="col" className="px-2 py-1.5 border border-gray-600">
              Sum
            </th>
            <th
              scope="col"
              className="!p-0 w-6 border border-gray-600 truncate"
            ></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(child) === true &&
            child?.map((item: any, index: number) => {
              if (Array.isArray(item) === true) {
                return (
                  <tr key={index} className="text-white bg-[#666]">
                    {createTable(item, open, parentId + 1)}
                  </tr>
                );
              } else {
                return (
                  <tr
                    key={index}
                    className={clsx(
                      "text-white",
                      item.limits.cashout === true &&
                        item.limits.pregame === true &&
                        item.limits.live === true &&
                        item.limits.slots === true &&
                        item.limits.casino === true
                        ? "bg-brand-red"
                        : "bg-[#666]"
                    )}
                  >
                    <UserTableItem
                      item_={item}
                      onHandleTransfer={onHandleTransfer}
                      onHandleBlock={onHandleBlock}
                      getChildren={(username: string, id: number) => {
                        getChildren(username, id);
                      }}
                      removeChildren={removeChildren}
                    />
                  </tr>
                );
              }
            })}
          {Array.isArray(child) === false && (
            <tr className="bg-[#666] text-white">
              <UserTableItem
                item_={child}
                onHandleTransfer={onHandleTransfer}
                onHandleBlock={onHandleBlock}
                getChildren={(username: string, id: number) => {
                  getChildren(username, id);
                }}
                removeChildren={removeChildren}
              />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

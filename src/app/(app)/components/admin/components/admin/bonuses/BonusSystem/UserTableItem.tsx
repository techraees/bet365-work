import { useState } from "react";
import clsx from "clsx";

interface UserTableItemProps {
  item_: any;
  getChildren: any;
  removeChildren: any;
};

const UserTableItem = ({
  item_,
  getChildren,
  removeChildren
}: UserTableItemProps) => {
  const [item, setItem] = useState(item_);
  const [open, setOpen] = useState(false);

  return (
    <>
      <td className="px-2 py-1.5 border border-gray-600 truncate">{item.username}</td>
      <td className="px-2 py-1.5 border border-gray-600 truncate">{item.role}</td>
      <td className="px-1 py-1 border border-gray-600 truncate">
        <div className="flex justify-end gap-1 w-full">
          <button
            type="button"
            className={clsx(
              "text-brand-button-text hover:text-white px-2 md:px-4 h-8 border border-black",
              open ? "bg-brand-clicked-button" : "bg-brand-button", item.role === 'User' ? "hidden" : "block"
            )}
            onClick={() => {
              if (!open) getChildren(item.username, item._id);
              else removeChildren(item.username, item._id);
              setOpen(!open);
            }}
          >
            Users
          </button>
          <button
            type="button"
            className="bg-brand-button text-brand-button-text hover:text-white px-2 md:px-4 h-8 border border-black"
          >
            Select
          </button>
        </div>
      </td>
    </>
  );
};

export default UserTableItem;

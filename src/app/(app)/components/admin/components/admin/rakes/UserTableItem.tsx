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
  const [rake, setRake] = useState(item_?.rake);

  return (
    <>
      <td className="px-2 py-1.5 border border-gray-600 truncate">{item.username}</td>
      <td className="px-2 py-1.5 border border-gray-600 truncate">{item.role}</td>
      <td className="!p-0 border border-gray-600 truncate">
        <select
          className="bg-gray-50 py-2.5 h-full border border-gray-300 text-gray-900 text-xs block focus:ring-0 focus:border-gray-300"
          value={rake}
          onChange={(e) => setRake(e.target.value)}
        >
          <option value="No Rake">No Rake</option>
          <option value="kataskinosi">kataskinosi</option>
          <option value="vizas-xilo">vizas-xilo</option>
        </select>
      </td>
      <td className="px-1 py-1 border border-gray-600 truncate">
        <div className="flex justify-end gap-1 w-full">
          <button
            type="button"
            className="bg-[#999] text-brand-button-text hover:text-white px-2 md:px-4 h-8 border border-black"
            disabled
          >
            Set Rake
          </button>
          <button
            type="button"
            className="bg-brand-button text-brand-button-text hover:text-white px-2 md:px-4 h-8 border border-black"
          >
            Remove All
          </button>
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
        </div>
      </td>
    </>
  );
};

export default UserTableItem;

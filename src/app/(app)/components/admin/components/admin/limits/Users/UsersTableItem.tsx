import { useState } from "react";
import { useSession } from "next-auth/react";

import clsx from "clsx";

import { useModalContext } from "../../../../contexts/ModalContext";

interface UserTableItemProps {
  item_: any;
  getChildren: any;
  removeChildren: any;
  onHandleLimitClick: any;
};

const UserTableItem = ({
  item_,
  getChildren,
  removeChildren,
  onHandleLimitClick
}: UserTableItemProps) => {
  const { openTransferModal } = useModalContext();
  const { data: session } = useSession();

  const [item, setItem] = useState(item_);
  const [open, setOpen] = useState(false);
  console.log(item)

  return (
    <>
      <td className="px-2 py-1.5 border border-gray-600 truncate">{item.username}</td>
      <td className="px-2 py-1.5 border border-gray-600 truncate">{item.role}</td>
      <td className="px-2 py-1.5 border border-gray-600 truncate">
        {item.createdDate}
      </td>
      <td className="w-6 px-1 py-1 border border-gray-600 truncate">
        <div className="flex gap-1 w-full justify-end">
          <button
            type="button"
            className={clsx("bg-brand-button text-brand-button-text hover:text-white px-2 md:px-4 h-8 border border-black", session.user.role === item.role ? "block" : "hidden")}
          >
            Authority
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
          <button
            type="button"
            className="bg-brand-button text-brand-button-text hover:text-white px-2 md:px-4 h-8 border border-black"
            onClick={() => onHandleLimitClick(item.username)}
          >
            Limits
          </button>
        </div>
      </td>
    </>
  );
};

export default UserTableItem;

import { useEffect, useState } from "react";
import clsx from "clsx";
import { useSession } from "next-auth/react";

import { getUsersCreatedBy } from "../../../../admin/api/userManagement";
import { getBlockStatus } from "../../../../admin/api/userBlock";
import { useModalContext } from "../../contexts/ModalContext";

interface UserTableItemProps {
  item_: any;
  getChildren: any;
  removeChildren: any;
  onHandleTransfer: any;
  onHandleBlock: any;
}

const UserTableItem = ({
  item_,
  getChildren,
  removeChildren,
  onHandleTransfer,
  onHandleBlock,
}: UserTableItemProps) => {
  const { data: session }: any = useSession();
  const { openTransferModal, openBlockUserModal } = useModalContext();
  const [item, setItem]: any = useState(null);
  const [open, setOpen] = useState(false);
  const [hasChildren, setHasChildren] = useState(false);

  useEffect(() => {
    if (item_ !== null) setItem(item_);
  }, [item_]);

  useEffect(() => {
    if (item_.role !== "User") getUserInfo();
  });

  const getUserInfo = async () => {
    const _childrenInfo = await getUsersCreatedBy(
      item_._id,
      session.user.token,
      session.user.role
    );
    if (_childrenInfo.length > 0) setHasChildren(true);
    else setHasChildren(false);
  };

  return (
    <>
      {item !== null && (
        <>
          <td className="px-2 py-1.5 border border-gray-600 truncate">
            {item.username}
          </td>
          <td className="px-2 py-1.5 border border-gray-600 truncate">
            {item.role}
          </td>
          <td className="px-2 max-sm:hidden py-1.5 border border-gray-600">
            {item.balance.sports_betting_slots +
              item.balance.live_casino +
              item.balance.sports_betting_slots_bonus +
              item.balance.live_casino_bonus}
          </td>
          <td className="px-2 py-1.5 border border-gray-600 truncate">
            <div className="flex gap-2 w-full justify-end">
              <button
                type="button"
                className={clsx(
                  "bg-brand-button text-brand-button-text hover:text-white px-2 md:px-4 h-8 border border-black",
                  Number(item.createdBy) !== session.user._id ? "hidden" : ""
                )}
                onClick={() => {
                  openTransferModal();
                  onHandleTransfer(item);
                }}
              >
                Transfer
              </button>
              <button
                type="button"
                className={clsx(
                  "text-brand-button-text hover:text-white px-2 md:px-4 h-8 border border-black",
                  open ? "bg-brand-clicked-button" : "bg-brand-button",
                  hasChildren === false ? "hidden" : "block"
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
                onClick={async () => {
                  const _blockStatus = await getBlockStatus(
                    item._id,
                    session.user.token,
                    session.user.role
                  );
                  openBlockUserModal();
                  onHandleBlock(item, _blockStatus[0].limits);
                }}
              >
                Block
              </button>
            </div>
          </td>
        </>
      )}
    </>
  );
};

export default UserTableItem;

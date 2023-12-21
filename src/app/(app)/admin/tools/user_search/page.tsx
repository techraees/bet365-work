"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import clsx from "clsx";

import ModalUserInfo from "../../../components/admin/components/admin/tools/UserSearch/ModalUserInfo";
import BlockUserModal from "../../users/ModalBlockUser";
import ModalLocation from "../../../components/admin/components/admin/tools/UserSearch/ModalLocation";

import Button from "../../../components/admin/components/ui/Button";
import { useModalContext } from "../../../components/admin/contexts/ModalContext";

import { getUserInfo } from "../../api/tools";

const UserSearch = () => {
  const router = useRouter();
  const { openUserInfoModal, openBlockUserModal, openLocationModal } =
    useModalContext();
  const { data: session }: any = useSession();

  const [userId, setUserId] = useState(0);
  const [loginName, setLoginName] = useState("");
  const [user, setUser] = useState("");
  const [userList, setUserList]: any = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [blockStatus, setBlockStatus] = useState(null);

  const onHandleSearch = async () => {
    const _res = await getUserInfo(session.user.token, session.user.role, userId);
    if (_res?.status === 200) {
      setUserList(_res.data);
    }
    else
      toast.error(_res?.data.error);
  };

  return (
    <section className="flex flex-col gap-4 p-4">
      <section className="flex flex-col gap-4">
        <div className="grid md:flex gap-1 justify-center items-center">
          <div className="flex flex-col">
            <p className="text-sm text-white">User Id:</p>
            <input
              type="text"
              className="bg-white border-gray-300 w-36 h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300"
              value={userId}
              onChange={(e) => {
                const regex = /^[0-9\b]+$/;
                if (e.target.value === "" || regex.test(e.target.value))
                  setUserId(Number(e.target.value));
              }}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-white">Login Name:</p>
            <input
              type="text"
              className="bg-white border-gray-300 w-36 h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300"
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col">
            <p className="text-sm text-white">User:</p>
            <input
              type="text"
              className="bg-white border-gray-300 w-48 h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="w-16 h-8 text-sm rounded-md bg-brand-dialog-button hover:bg-white"
            disabled={userId === 0 ? true : false}
            onClick={(e) => onHandleSearch()}
          >
            Search
          </button>
        </div>
      </section>
      {userList !== null && (
        <section className="flex flex-col gap-4 pt-4">
          <div className="w-full overflow-x-scroll md:overflow-hidden">
            <table className="w-full text-sm text-white text-center">
              <thead className="text-sm bg-brand-yellow text-black">
                <tr>
                  <th scope="col" className="px-2 py-1.5 border border-black">
                    User
                  </th>
                  <th scope="col" className="px-2 py-1.5 border border-black">
                    User Type
                  </th>
                  <th scope="col" className="px-2 py-1.5 border border-black">
                    Parent Id
                  </th>
                  <th scope="col" className="px-2 py-1.5 border border-black">
                    Last Login
                  </th>
                  <th scope="col" className="px-2 py-1.5 border border-black">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#666] border border-black">
                  <td
                    className={clsx(
                      "px-1 py-1 border border-black text-black w-14"
                    )}
                  >
                    <div
                      className="flex gap-2 p-2 border border-black w-full justify-center bg-[#333] cursor-pointer text-brand-button-text hover:text-white"
                      onClick={() => {
                        setSelectedItem(userList);
                        openUserInfoModal();
                      }}
                    >
                      {userList.username}
                    </div>
                  </td>
                  <td className="px-2 py-1 border border-black">
                    {userList.role}
                  </td>
                  <td className="px-2 py-1 border border-black">
                    {userList.createdBy}
                  </td>
                  <td className="px-2 py-1 border border-black">
                    {new Date(userList.createdDate).toString()}
                  </td>
                  <td className="px-1 py-1 border border-black w-48">
                    <div className="flex gap-1 w-full justify-center">
                      <Button
                        type="action"
                        name="Block"
                        onHandleClick={() => {
                          setSelectedItem(userList);
                          openBlockUserModal();
                        }}
                      />
                      <Button
                        type="action"
                        name="Location"
                        onHandleClick={() => {
                          setSelectedItem(userList);
                          openLocationModal();
                        }}
                      />
                      <Button
                        type="action"
                        name="Bets"
                        onHandleClick={() =>
                          router.push(
                            `/admin/reports/bets_list?username=${userList.username}`
                          )
                        }
                      />
                      <Button
                        type="action"
                        name="Slots"
                        onHandleClick={() =>
                          router.push(
                            `/admin/reports/slots?username=${userList.username}`
                          )
                        }
                      />
                      <Button
                        type="action"
                        name="Casino"
                        onHandleClick={() =>
                          router.push(
                            `/admin/reports/casino?username=${userList.username}`
                          )
                        }
                      />
                      <Button
                        type="action"
                        name="Transactions"
                        onHandleClick={() =>
                          router.push(
                            `/admin/reports/transactions?username=${userList.username}`
                          )
                        }
                      />
                      <Button
                        type="action"
                        name="Activity"
                        onHandleClick={() =>
                          router.push(
                            `/admin/reports/transactions?username=${userList.username}`
                          )
                        }
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}
      <ModalUserInfo item={selectedItem} />
      <BlockUserModal item={selectedItem} blockStatus={blockStatus} onhandleFullBlock={() => {}} />
      <ModalLocation item={selectedItem} />
    </section>
  );
};

export default UserSearch;

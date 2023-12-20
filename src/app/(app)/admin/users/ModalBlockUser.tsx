"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Modal } from "antd";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import { useModalContext } from "../../components/admin/contexts/ModalContext";
import { setLimit, setUnLimit } from "../api/userBlock";

interface BlockUserModalProps {
  item: any;
  blockStatus: any;
  onhandleFullBlock: any;
}

function BlockUserModal({ item, blockStatus, onhandleFullBlock }: BlockUserModalProps) {
  const { data: session }: any = useSession();
  const { isBlockUserModalOpen, closeBlockUserModal } = useModalContext();

  const [name, setName] = useState("");
  const [currentTab, setCurrentTab] = useState("General");
  const [fullBlock, setFullBlock] = useState(false);
  const [blockCashout, setBlockCashout] = useState(false);
  const [blockPre, setBlockPre] = useState(false);
  const [blockLive, setBlockLive] = useState(false);
  const [blockSlots, setBlockSlots] = useState(false);
  const [blockCasino, setBlockCasino] = useState(false);
  const [blockInstakasa, setBlockInstakasa] = useState(false);

  useEffect(() => {
    if (item !== null) {
      setName(item.username);
    }
    if (blockStatus !== null) {
      if (blockStatus.cashout === true && blockStatus.pregame === true && blockStatus.live === true && blockStatus.slots === true && blockStatus.casino === true)
        setFullBlock(true);
      else
        setFullBlock(false);
      setBlockCashout(blockStatus.cashout);
      setBlockPre(blockStatus.pregame);
      setBlockLive(blockStatus.live);
      setBlockSlots(blockStatus.slots);
      setBlockCasino(blockStatus.casino);
    }
  }, [item, blockStatus]);

  const onHandleClose = () => {
    setCurrentTab("General");
    closeBlockUserModal();
  };

  const handleFullBlock = async() => {
    let _res;
    if (fullBlock === true)
      _res = await setUnLimit(item._id, session.user.token, session.user.role, "full");
    else
      _res = await setLimit(item._id, session.user.token, session.user.role, "full");

    if (_res?.status === 200) {
      setFullBlock(!fullBlock);
      setBlockCashout(!fullBlock);
      setBlockPre(!fullBlock);
      setBlockLive(!fullBlock);
      setBlockSlots(!fullBlock);
      setBlockCasino(!fullBlock);
      onhandleFullBlock();
    }
    else
      toast.error(_res?.data.message);
  }

  const handleBlockCashout = async() => {
    let _res;
    if (blockCashout === true)
      _res = await setUnLimit(item._id, session.user.token, session.user.role, "cashout");
    else
      _res = await setLimit(item._id, session.user.token, session.user.role, "cashout");

    if (_res?.status === 200)
      setBlockCashout(!blockCashout);
    else
      toast.error(_res?.data.message);
  }

  const handleBlockPre = async() => {
    let _res;
    if (blockPre === true)
      _res = await setUnLimit(item._id, session.user.token, session.user.role, "pregame");
    else
      _res = await setLimit(item._id, session.user.token, session.user.role, "pregame");

    if (_res?.status === 200)
      setBlockPre(!blockPre);
    else
      toast.error(_res?.data.message);
  }

  const handleBlockLive = async() => {
    let _res;
    if (blockLive === true)
      _res = await setUnLimit(item._id, session.user.token, session.user.role, "live");
    else
      _res = await setLimit(item._id, session.user.token, session.user.role, "live");

    if (_res?.status === 200)
      setBlockLive(!blockLive);
    else
      toast.error(_res?.data.message);
  }

  const handleBlockSlots = async() => {
    let _res;
    if (blockSlots === true)
      _res = await setUnLimit(item._id, session.user.token, session.user.role, "slots");
    else
      _res = await setLimit(item._id, session.user.token, session.user.role, "slots");

    if (_res?.status === 200)
      setBlockSlots(!blockSlots);
    else
      toast.error(_res?.data.message);
  }

  const handleBlockCasino = async() => {
    let _res;
    if (blockCasino === true)
      _res = await setUnLimit(item._id, session.user.token, session.user.role, "casino");
    else
      _res = await setLimit(item._id, session.user.token, session.user.role, "casino");

    if (_res?.status === 200)
      setBlockCasino(!blockCasino);
    else
      toast.error(_res?.data.message);
  }

  return (
    <Modal
      title={"Block " + name}
      open={isBlockUserModalOpen}
      onCancel={onHandleClose}
      footer={[
        <div key="close" className="flex justify-center">
          <button
            className="px-4 py-1.5 rounded-md bg-brand-dialog-button"
            onClick={onHandleClose}
          >
            Close
          </button>
        </div>,
      ]}
    >
      <section className="flex flex-col">
        <ul className="flex text-sm font-medium text-center text-gray-500">
          <li className="w-full">
            <a
              className={clsx(
                "inline-block w-full p-2.5 text-white",
                currentTab === "General" ? "bg-brand-dialog" : "bg-brand-button"
              )}
              onClick={() => setCurrentTab("General")}
            >
              Ganeral
            </a>
          </li>
          <li className="w-full">
            <a
              className={clsx(
                "inline-block w-full p-2.5 text-white",
                currentTab === "Slots" ? "bg-brand-dialog" : "bg-brand-button"
              )}
              onClick={() => setCurrentTab("Slots")}
            >
              Slots
            </a>
          </li>
          <li className="w-full">
            <a
              className={clsx(
                "inline-block w-full p-2.5 text-white",
                currentTab === "Casino" ? "bg-brand-dialog" : "bg-brand-button"
              )}
              onClick={() => setCurrentTab("Casino")}
            >
              Casino
            </a>
          </li>
          <li className="w-full">
            <a
              className={clsx(
                "inline-block w-full p-2.5 text-white",
                currentTab === "Deposit" ? "bg-brand-dialog" : "bg-brand-button"
              )}
              onClick={() => setCurrentTab("Deposit")}
            >
              Deposit
            </a>
          </li>
        </ul>
        <div>
          <section
            className={clsx(
              "px-8 py-4",
              currentTab === "General" ? "flex" : "hidden"
            )}
          >
            <div className="flex flex-col gap-6 w-1/2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
                  checked={fullBlock === true ? true : false}
                  onChange={handleFullBlock}
                />
                <label
                  htmlFor="checked-checkbox"
                  className="ml-2 text-sm font-medium text-white"
                >
                  Full Block
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
                  checked={blockCashout === true ? true : false}
                  onChange={handleBlockCashout}
                />
                <label
                  htmlFor="checked-checkbox"
                  className="ml-2 text-sm font-medium text-white"
                >
                  Block Cashout
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-6 px-4 w-1/2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
                  checked={blockPre === true ? true : false}
                  onChange={handleBlockPre}
                />
                <label
                  htmlFor="checked-checkbox"
                  className="ml-2 text-sm font-medium text-white"
                >
                  Block Pre
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
                  checked={blockLive === true ? true : false}
                  onChange={handleBlockLive}
                />
                <label
                  htmlFor="checked-checkbox"
                  className="ml-2 text-sm font-medium text-white"
                >
                  Block Live
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
                  checked={blockSlots === true ? true : false}
                  onChange={handleBlockSlots}
                />
                <label
                  htmlFor="checked-checkbox"
                  className="ml-2 text-sm font-medium text-white"
                >
                  Block Slots
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
                  checked={blockCasino === true ? true : false}
                  onChange={handleBlockCasino}
                />
                <label
                  htmlFor="checked-checkbox"
                  className="ml-2 text-sm font-medium text-white"
                >
                  Block Casino
                </label>
              </div>
            </div>
          </section>
          <section
            className={clsx(
              "px-4 py-4",
              currentTab === "Slots" ? "flex" : "hidden"
            )}
          >
            <table className="w-full text-sm text-gray-400 text-center">
              <thead className="text-sm, bg-brand-yellow text-black">
                <tr>
                  <th
                    scope="col"
                    className="py-1.5 border border-gray-600 w-[10%]"
                  ></th>
                  <th
                    scope="col"
                    className="py-1.5 border border-gray-600 w-[60%]"
                  >
                    Name
                  </th>
                  <th scope="col" className="py-1.5 border border-gray-600">
                    Provider
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#666] text-white hover:cursor-pointer hover:bg-brand-hover-table">
                  <td className="py-1 border border-gray-600">1</td>
                  <td className="py-1 border border-gray-600">egt</td>
                  <td className="py-1 border border-gray-600">
                    ekko
                  </td>
                </tr>
                <tr className="bg-[#666] text-white hover:cursor-pointer hover:bg-brand-hover-table">
                  <td className="py-1 border border-gray-600">2</td>
                  <td className="py-1 border border-gray-600">novomatic</td>
                  <td className="py-1 border border-gray-600">
                    ekko
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
          <section
            className={clsx(
              "px-4 py-4",
              currentTab === "Casino" ? "flex" : "hidden"
            )}
          >
            <table className="w-full text-sm text-gray-400 text-center">
              <thead className="text-sm, bg-brand-yellow text-black">
                <tr>
                  <th
                    scope="col"
                    className="py-1.5 border border-gray-600 w-[10%]"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="py-1.5 border border-gray-600 w-[60%]"
                  >
                    Provider
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#666] text-white hover:cursor-pointer hover:bg-brand-hover-table">
                  <td className="py-1 border border-gray-600">1</td>
                  <td className="py-1 border border-gray-600">Live Casino</td>
                </tr>
                <tr className="bg-[#666] text-white hover:cursor-pointer hover:bg-brand-hover-table">
                  <td className="py-1 border border-gray-600">17</td>
                  <td className="py-1 border border-gray-600">Evolution</td>
                </tr>
              </tbody>
            </table>
          </section>
          <section
            className={clsx(
              "px-8 py-4",
              currentTab === "Deposit" ? "flex" : "hidden"
            )}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
                onChange={() => setBlockInstakasa(!blockInstakasa)}
              />
              <label
                htmlFor="checked-checkbox"
                className="ml-2 text-sm font-medium text-white"
              >
                Block Instakasa
              </label>
            </div>
          </section>
        </div>
      </section>
    </Modal>
  );
}

export default BlockUserModal;

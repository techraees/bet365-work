"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Modal } from "antd";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSession } from "next-auth/react";

import { useModalContext } from "../../components/admin/contexts/ModalContext";
import { transferBalance } from "../api/userManagement";

interface TransferModalProps {
  item: any;
  handleConfirm: any;
}

function TransferModal({ item, handleConfirm }: TransferModalProps) {
  const { data: session }: any = useSession();
  const { isTransferModalOpen, closeTransferModal } = useModalContext();
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);
  const [transactionType, setTransactionType] = useState("Deposit");
  const [balanceType, setBalanceType] = useState("sports_betting_slots");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (item !== null) {
      setId(item._id);
      setName(item.username);
      setBalance(
        item.balance.sports_betting_slots +
          item.balance.live_casino +
          item.balance.sports_betting_slots_bonus +
          item.balance.live_casino_bonus
      );
    }
  }, [item]);

  const onHandleConfirm = async () => {
    let _transferType;
    if (transactionType === "Deposit")
      _transferType = "increase";
    else
      _transferType = "decrease";

    const _result = await transferBalance(session.user.token, session.user.role, id, _transferType, balanceType, amount);
    if (_result?.status === 200)
      toast.success(_result?.data.message, {
        position: "bottom-center"
      });
    else
      toast.error(_result?.data.message, {
        position: "bottom-center"
      });

    setTransactionType("Deposit");
    setBalanceType("live_casino");
    setAmount(0);
    closeTransferModal();
    handleConfirm();
  };

  const onHandleClose = () => {
    setTransactionType("Deposit");
    setBalanceType("live_casino");
    setAmount(0);
    closeTransferModal();
  };

  return (
    <div>
      <Modal
        title="Transfers"
        open={isTransferModalOpen}
        onCancel={onHandleClose}
        footer={[
          <div key="confirm" className="flex justify-center">
            <button
              className={clsx(
                "px-4 py-1.5 rounded-md",
                amount === 0
                  ? "bg-brand-disabled-dialog-button"
                  : "bg-brand-dialog-button"
              )}
              disabled={amount === 0 ? true : false}
              onClick={onHandleConfirm}
            >
              Confirm
            </button>
          </div>,
        ]}
      >
        <section className="flex flex-col bg-brand-dialog items-center">
          <div className="flex gap-6 justify-center h-10 w-full text-white">
            <p className="w-full text-right m-auto">Id:</p>
            <p className="w-full m-auto">{id}</p>
          </div>
          <div className="flex gap-6 justify-center h-10 w-full text-white">
            <p className="w-full text-right m-auto">Name:</p>
            <p className="w-full m-auto">{name}</p>
          </div>
          <div className="flex gap-6 justify-center h-10 w-full text-white">
            <p className="w-full text-right m-auto">Balance:</p>
            <p className="w-full m-auto">{balance}</p>
          </div>
          <div className="flex gap-6 items-center justify-center h-10 w-full text-white">
            <p className="w-full text-right m-auto">Type of Transaction:</p>
            <div className="w-full m-auto">
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block w-37 focus:ring-0 focus:border-gray-300 w-full"
                defaultValue={transactionType}
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
              >
                <option value="Deposit">Deposit</option>
                <option value="Charge">Charge</option>
              </select>
            </div>
          </div>
          <div className="flex gap-6 items-center justify-center h-10 w-full text-white">
            <p className="w-full text-right m-auto">Type of Balance:</p>
            <div className="w-full m-auto">
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block w-37 focus:ring-0 focus:border-gray-300 w-full"
                defaultValue={balanceType}
                value={balanceType}
                onChange={(e) => setBalanceType(e.target.value)}
              >
                <option value="live_casino">live_casino</option>
                <option value="sports_betting_slots">sports_betting_slots</option>
              </select>
            </div>
          </div>
          <div className="flex gap-6 items-center justify-center h-10 w-full">
            <p className="w-full text-right m-auto text-white">Amount:</p>
            <div className="w-full m-auto">
              <input
                type="text"
                className="bg-white border-gray-300 w-37 h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300"
                placeholder="Amount"
                value={amount}
                onChange={(e) => {
                  const regex = /^[0-9\b]+$/;
                  if (e.target.value === "" || regex.test(e.target.value))
                    setAmount(Number(e.target.value));
                }}
              />
            </div>
          </div>
        </section>
      </Modal>
      <ToastContainer />

    </div>
  );
}

export default TransferModal;

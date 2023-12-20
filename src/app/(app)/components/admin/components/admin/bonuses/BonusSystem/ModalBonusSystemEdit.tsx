"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Modal } from "antd";
import { useModalContext } from "@/app/(app)/components/admin/contexts/ModalContext";
import Input from "../../../ui/Input";

function ModalBonusSystemEdit({ item }: { item: any }) {
  const { isBonusSystemEditModalOpen, closeBonusSystemEditModal } =
    useModalContext();
  const [currentTab, setCurrentTab] = useState("General");
  // General
  const [name, setName] = useState(item?.name);
  const [title, setTitle] = useState(item?.type);
  const [active, setActive] = useState(item?.active);
  const [description, setDescription] = useState("");
  // Settings
  const [repeat, setRepeat] = useState("every month");
  const [availableFrom, setAvailableFrom] = useState(3);
  const [availableTo, setAvailableTo] = useState(18);
  const [percentOfGGR, setPercentOfGGR] = useState(0);
  const [minimumGGR, setMinimumGGR] = useState(0);
  const [amount, setAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [activeDays, setActiveDays] = useState(15);
  const [splitAmount, setSplitAmount] = useState(false);
  const [useBalanceFirst, setUseBalanceFirst] = useState(false);
  const [autoActivate, setAutoActivate] = useState(true);

  return (
    <Modal
      title={"Block: " + item?.type}
      open={isBonusSystemEditModalOpen}
      onCancel={closeBonusSystemEditModal}
      footer={[
        <div key="close" className="flex gap-2 justify-center">
          <button
            className="px-4 py-1.5 rounded-md bg-green-700 hover:bg-green-600 text-white"
            onClick={closeBonusSystemEditModal}
          >
            Save
          </button>
          <button
            className="px-4 py-1.5 rounded-md bg-brand-dialog-button"
            onClick={closeBonusSystemEditModal}
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
              General
            </a>
          </li>
          <li className="w-full">
            <a
              className={clsx(
                "inline-block w-full p-2.5 text-white",
                currentTab === "Settings"
                  ? "bg-brand-dialog"
                  : "bg-brand-button"
              )}
              onClick={() => setCurrentTab("Settings")}
            >
              Settings
            </a>
          </li>
          <li className="w-full">
            <a
              className={clsx(
                "inline-block w-full p-2.5 text-white",
                currentTab === "Products"
                  ? "bg-brand-dialog"
                  : "bg-brand-button"
              )}
              onClick={() => setCurrentTab("Products")}
            >
              Products
            </a>
          </li>
        </ul>
        <section>
          <section
            className={clsx(
              "px-8 py-4",
              currentTab === "General" ? "flex" : "hidden"
            )}
          >
            <div className="flex flex-col gap-2 w-full">
              <div className="flex gap-6 items-center">
                <p className="text-sm text-end text-white w-1/4">Name:</p>
                <Input
                  className="bg-white border-gray-300 w-full h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-sm"
                  placeholder="Name"
                  disable_value={false}
                  value={name}
                  onHandleChange={(e: any) => setName(e.target.value)}
                />
              </div>
              <div className="flex gap-6 items-center">
                <p className="text-sm text-end text-white w-1/4">Title:</p>
                <Input
                  className="bg-white border-gray-300 w-full h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-sm"
                  placeholder="Name"
                  disable_value={false}
                  value={title}
                  onHandleChange={(e: any) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex gap-6 items-center">
                <p className="text-sm text-end text-white w-1/4">Active:</p>
                <div className="w-full">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
                    onChange={() => setActive(!active)}
                  />
                </div>
              </div>
              <textarea
                className="w-full h-24 p-2 focus:outline-none focus:ring-0 text-black bg-white"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </section>
          <section
            className={clsx(
              "px-8 py-4",
              currentTab === "Settings" ? "flex" : "hidden"
            )}
          >
            <div className="flex flex-col gap-2 w-full">
              <div className="flex gap-6 items-center">
                <p className="text-sm text-end text-white w-1/2">Repeat:</p>
                <div className="w-full m-auto">
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block w-full focus:ring-0 focus:border-gray-300"
                    defaultValue={repeat}
                    onChange={(e) => setRepeat(e.target.value)}
                  >
                    <option value="No Repeat">No Repeat</option>
                    <option value="every month">every month</option>
                    <option value="every 3 months">every 3 months</option>
                    <option value="every 6 months">every 6 months</option>
                    <option value="every year">every year</option>
                    <option value="every week">every week</option>
                    <option value="every 10 days">every 10 days</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <p className="text-sm text-end text-white w-1/2">Available:</p>
                <div className="flex gap-2 w-full">
                  <Input
                    className="bg-white border-gray-300 w-full h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-sm"
                    placeholder=""
                    disable_value={false}
                    value={availableFrom}
                    onHandleChange={(e: any) => setAvailableFrom(e.target.value)}
                  />
                  <Input
                    className="bg-white border-gray-300 w-full h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-sm"
                    placeholder=""
                    disable_value={false}
                    value={availableTo}
                    onHandleChange={(e: any) => setAvailableTo(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <p className="text-sm text-end text-white w-1/2">Percent of GGR:</p>
                <Input
                  className="bg-brand-light-grey border-gray-300 w-full h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-sm"
                  placeholder="Percent"
                  disable_value={true}
                  value={percentOfGGR}
                  onHandleChange={(e: any) => setPercentOfGGR(e.target.value)}
                />
              </div>
              <div className="flex gap-6 items-center">
                <p className="text-sm text-end text-white w-1/2">Minimum GGR:</p>
                <Input
                  className="bg-brand-light-grey border-gray-300 w-full h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-sm"
                  placeholder="GGR"
                  disable_value={true}
                  value={minimumGGR}
                  onHandleChange={(e: any) => setMinimumGGR(e.target.value)}
                />
              </div>
              <div className="flex gap-6 items-center">
                <p className="text-sm text-end text-white w-1/2">Amount:</p>
                <Input
                  className="bg-brand-light-grey border-gray-300 w-full h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-sm"
                  placeholder="Amount"
                  disable_value={true}
                  value={amount}
                  onHandleChange={(e: any) => setAmount(e.target.value)}
                />
              </div>
              <div className="flex gap-6 items-center">
                <p className="text-sm text-end text-white w-1/2">Max Amount:</p>
                <Input
                  className="bg-white border-gray-300 w-full h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-sm"
                  placeholder="Amount"
                  disable_value={false}
                  value={maxAmount}
                  onHandleChange={(e: any) => setMaxAmount(e.target.value)}
                />
              </div>
              <div className="flex gap-6 items-center">
                <p className="text-sm text-end text-white w-1/2">Active Days:</p>
                <Input
                  className="bg-white border-gray-300 w-full h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-sm"
                  placeholder=""
                  disable_value={false}
                  value={activeDays}
                  onHandleChange={(e: any) => setActiveDays(e.target.value)}
                />
              </div>
              <div className="flex gap-6 items-center">
                <p className="text-sm text-end text-white w-1/2">Split Amount:</p>
                <div className="w-full">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
                    onChange={() => setSplitAmount(!splitAmount)}
                  />
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <p className="text-sm text-end text-white w-1/2">Use Balance First:</p>
                <div className="w-full">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
                    onChange={() => setUseBalanceFirst(!useBalanceFirst)}
                  />
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <p className="text-sm text-end text-white w-1/2">Auto Activate:</p>
                <div className="w-full">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
                    onChange={() => setAutoActivate(!autoActivate)}
                  />
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>
    </Modal>
  );
}

export default ModalBonusSystemEdit;

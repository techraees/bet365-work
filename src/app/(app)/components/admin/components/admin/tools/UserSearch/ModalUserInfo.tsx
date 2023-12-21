import { useState, useEffect } from "react";
import { Modal } from "antd";
import clsx from "clsx";

import { useModalContext } from "../../../../contexts/ModalContext";
import ModalTransferAmount from "./ModalTransferAmount";
import ModalChangePassword from "./ModalChangePassword";
import Input from "../../../ui/Input";

const ModalUserInfo = ({ item }: any) => {
  const { isUserInfoModalOpen, closeUserInfoModal, openTransferAmountModal, openChangePasswordModal } = useModalContext();
  const [currentTab, setCurrentTab] = useState("Info");
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(item?.username);
  const [surname, setSurname] = useState(item?.username);
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const onHandleClose = () => {
    setCurrentTab("Info");
    closeUserInfoModal();
  };

  return (
    <>
      <Modal
        title={"User (" + item?.username + ")"}
        open={isUserInfoModalOpen}
        onCancel={onHandleClose}
        bodyStyle={{
          height: "550px",
        }}
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
        <section className="flex flex-col gap-4 bg-brand-dialog items-center">
          <section className="text-sm font-medium text-center text-white w-full">
            <ul className="flex w-full">
              <li
                className={clsx(
                  "w-1/2 py-2 cursor-pointer",
                  currentTab === "Info" ? "" : "bg-[#444]"
                )}
                onClick={() => setCurrentTab("Info")}
              >
                Info
              </li>
              <li
                className={clsx(
                  "w-1/2 py-2 cursor-pointer",
                  currentTab === "Details" ? "" : "bg-[#444]"
                )}
                onClick={() => setCurrentTab("Details")}
              >
                Details
              </li>
            </ul>
          </section>
          {item !== null && (
            <>
              <section
                className={clsx(
                  "flex-col bg-brand-dialog items-center px-2 w-full",
                  currentTab === "Info" ? "flex" : "hidden"
                )}
              >
                <div className="flex gap-2 md:gap-4 justify-center h-10 w-full text-white">
                  <p className="w-full text-right m-auto">Id:</p>
                  <p className="w-full m-auto">{item._id}</p>
                </div>
                <div className="flex gap-2 md:gap-4 justify-center h-10 w-full text-white">
                  <p className="w-full text-right m-auto">Username:</p>
                  <p className="w-full m-auto">{item.username}</p>
                </div>
                <div className="flex gap-2 md:gap-4 justify-center h-10 w-full text-white">
                  <p className="w-full text-right m-auto">Password:</p>
                  <p className="w-full m-auto">{item.password}</p>
                </div>
                <div className="flex gap-2 md:gap-4 justify-center h-10 w-full text-white">
                  <p className="w-full text-right m-auto">Type:</p>
                  <p className="w-full m-auto">{item.role}</p>
                </div>
                <div className="flex gap-2 md:gap-4 justify-center h-10 w-full text-white">
                  <p className="w-full text-right m-auto">Register:</p>
                  <p className="w-full m-auto">{new Date(item.createdDate).toString()}</p>
                </div>
                <div className="flex gap-2 md:gap-4 justify-center h-10 w-full text-white">
                  <p className="w-full text-right m-auto">Balance:</p>
                  <p className="w-full m-auto">
                    {item.balance.sports_betting +
                      item.balance.casino +
                      item.balance.sports_betting_bonus +
                      item.balance.casino_bonus +
                      item.balance.agent}
                  </p>
                </div>
                <div className="flex gap-2 md:gap-4 justify-center h-10 w-full text-white">
                  <p className="w-full text-right m-auto">Transfer:</p>
                  <div className="w-full m-auto">
                    <button
                      type="button"
                      className="flex gap-2 w-20 py-1.5 border border-black justify-center bg-[#333] cursor-pointer text-brand-button-text hover:text-white"
                      onClick={() => {
                        onHandleClose();
                        openTransferAmountModal();
                      }}
                    >
                      Amount
                    </button>
                  </div>
                </div>
                <div className="flex gap-2 md:gap-4 justify-center h-10 w-full text-white">
                  <p className="w-full text-right m-auto">Password:</p>
                  <div className="w-full m-auto">
                    <button
                      type="button"
                      className="flex gap-2 w-20 py-1.5 border border-black justify-center bg-[#333] cursor-pointer text-brand-button-text hover:text-white"
                      onClick={() => {
                        onHandleClose();
                        openChangePasswordModal();
                      }}
                    >
                      Change
                    </button>
                  </div>
                </div>
                <div className="flex gap-2 md:gap-4 justify-center h-10 w-full text-white">
                  <p className="w-full text-right m-auto">Notes:</p>
                  <p className="w-full m-auto"></p>
                </div>
                <div className="flex gap-2 md:gap-4 justify-center h-10 w-full text-white">
                  <p className="w-full text-right m-auto">Parents:</p>
                  <div className="flex flex-col w-full mt-2">
                    {item.parents?.map((parent: any, index: number) => {
                      return (
                        <p key={index} className="w-full m-auto">{parent.id} • {parent.username}</p>
                      )
                    })}
                  </div>
                </div>
              </section>
              <section
                className={clsx(
                  "flex-col bg-brand-dialog items-center px-2 md:px-4 w-full",
                  currentTab === "Details" ? "flex" : "hidden"
                )}
              >
                <div className="flex gap-2 md:gap-4 h-10 w-full text-white items-center">
                  <p className="w-1/4 text-right m-auto">Name</p>
                  <Input
                    className={clsx(
                      "w-full h-8 p-2 focus:outline-none focus:ring-0 text-black",
                      editMode === false ? "bg-gray-300" : "bg-white"
                    )}
                    placeholder=""
                    value={name}
                    disable_value={editMode}
                    onHandleChange={(value: string) => setName(value)}
                  />
                </div>
                <div className="flex gap-2 md:gap-4 h-10 w-full text-white items-center">
                  <p className="w-1/4 text-right m-auto">Surname</p>
                  <Input
                    className={clsx(
                      "w-full h-8 p-2 focus:outline-none focus:ring-0 text-black",
                      editMode === false ? "bg-gray-300" : "bg-white"
                    )}
                    placeholder=""
                    value={surname}
                    disable_value={editMode}
                    onHandleChange={(value: string) => setSurname(value)}
                  />
                </div>
                <div className="flex gap-2 md:gap-4 h-10 w-full text-white items-center">
                  <p className="w-1/4 text-right m-auto">Country</p>
                  <select
                    className={clsx(
                      "w-full text-xs block focus:ring-0 text-black",
                      editMode === false ? "bg-gray-300" : "bg-white"
                    )}
                    disabled={editMode === false ? true : false}
                    onChange={(e) => setCountry(e.target.value)}
                  ></select>
                </div>
                <div className="flex gap-2 md:gap-4 h-10 w-full text-white items-center">
                  <p className="w-1/4 text-right m-auto">Region</p>
                  <Input
                    className={clsx(
                      "w-full h-8 p-2 focus:outline-none focus:ring-0 text-black",
                      editMode === false ? "bg-gray-300" : "bg-white"
                    )}
                    placeholder=""
                    value={region}
                    disable_value={editMode}
                    onHandleChange={(value: string) => setRegion(value)}
                  />
                </div>
                <div className="flex gap-2 md:gap-4 h-10 w-full text-white items-center">
                  <p className="w-1/4 text-right m-auto">City</p>
                  <Input
                    className={clsx(
                      "w-full h-8 p-2 focus:outline-none focus:ring-0 text-black",
                      editMode === false ? "bg-gray-300" : "bg-white"
                    )}
                    placeholder=""
                    value={city}
                    disable_value={editMode}
                    onHandleChange={(value: string) => setCity(value)}
                  />
                </div>
                <div className="flex gap-2 md:gap-4 h-10 w-full text-white items-center">
                  <p className="w-1/4 text-right m-auto">Address</p>
                  <Input
                    className={clsx(
                      "w-full h-8 p-2 focus:outline-none focus:ring-0 text-black",
                      editMode === false ? "bg-gray-300" : "bg-white"
                    )}
                    placeholder=""
                    value={address}
                    disable_value={editMode}
                    onHandleChange={(value: string) => setAddress(value)}
                  />
                </div>
                <div className="flex gap-2 md:gap-4 h-10 w-full text-white items-center">
                  <p className="w-1/4 text-right m-auto">Zip</p>
                  <Input
                    className={clsx(
                      "w-full h-8 p-2 focus:outline-none focus:ring-0 text-black",
                      editMode === false ? "bg-gray-300" : "bg-white"
                    )}
                    placeholder=""
                    value={zip}
                    disable_value={editMode}
                    onHandleChange={(value: string) => setZip(value)}
                  />
                </div>
                <div className="flex gap-2 md:gap-4 h-10 w-full text-white items-center">
                  <p className="w-1/4 text-right m-auto">Phone</p>
                  <Input
                    className={clsx(
                      "w-full h-8 p-2 focus:outline-none focus:ring-0 text-black",
                      editMode === false ? "bg-gray-300" : "bg-white"
                    )}
                    placeholder=""
                    value={phone}
                    disable_value={editMode}
                    onHandleChange={(value: string) => setPhone(value)}
                  />
                </div>
                <div className="flex gap-2 md:gap-4 h-10 w-full text-white items-center">
                  <p className="w-1/4 text-right m-auto">Email</p>
                  <Input
                    className={clsx(
                      "w-full h-8 p-2 focus:outline-none focus:ring-0 text-black",
                      editMode === false ? "bg-gray-300" : "bg-white"
                    )}
                    placeholder=""
                    value={email}
                    disable_value={editMode}
                    onHandleChange={(value: string) => setEmail(value)}
                  />
                </div>
                <div className="flex gap-2 md:gap-4 w-full">
                  <p className="w-1/4 text-right h-10 mt-1 text-white">Notes</p>
                  <textarea
                    className={clsx(
                      "w-full h-24 p-2 focus:outline-none focus:ring-0 text-black",
                      editMode === false ? "bg-gray-300" : "bg-white"
                    )}
                    value={notes}
                    disabled={editMode === false ? true : false}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 md:gap-4 justify-center h-10 w-full">
                  <p className="w-1/4 text-right m-auto text-white"></p>
                  <div className="flex gap-2 w-full m-auto">
                    <button
                      type="button"
                      className={clsx(
                        "flex gap-2 w-20 mt-1 py-1.5 border border-black justify-center cursor-pointer text-brand-button-text hover:text-white",
                        editMode === false ? "bg-[#14805e]" : "bg-[#333]"
                      )}
                      onClick={() => setEditMode(!editMode)}
                    >
                      {editMode === false ? "Edit" : "Save"}
                    </button>
                    <button
                      type="button"
                      className={clsx(
                        "gap-2 w-20 mt-1 py-1.5 border border-black justify-center cursor-pointer text-brand-button-text hover:text-white bg-[#333]",
                        editMode === false ? "hidden" : "flex"
                      )}
                      onClick={() => setEditMode(!editMode)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </section>
            </>
          )}
        </section>
      </Modal>
      <ModalTransferAmount item={item} />
      <ModalChangePassword item={item} />
    </>
  );
};

export default ModalUserInfo;

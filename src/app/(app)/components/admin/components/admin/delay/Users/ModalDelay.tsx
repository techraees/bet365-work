import { useState } from "react";
import { Modal } from "antd";

import { useModalContext } from "../../../../contexts/ModalContext";
import GroupTable from "../Settings/GroupTable";

const ModalDelay = ({ tableList, userName }: { tableList: any, userName: string }) => {
  const { isDelayModalOpen, closeDelayModal } = useModalContext();
  const [sport, setSport] = useState("Football");
  const [group, setGroup] = useState("All Groups");

  return (
    <Modal
      className="modal-delay"
      title={"Delay: " + userName}
      open={isDelayModalOpen}
      onCancel={closeDelayModal}
      footer={[<div key="Confirm" className="flex gap-2 justify-center"></div>]}
    >
      <section className="flex flex-col gap-4 bg-brand-dialog items-center pt-4 px-4">
        <section className="flex flex-col md:flex-row gap-4 w-full justify-between items-center">
          <section className="flex gap-1 items-center">
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
              onChange={(e) => setSport(e.target.value)}
            >
              <option value="Football">Football</option>
              <option value="Basketball">Basketball</option>
              <option value="Tennis">Tennis</option>
              <option value="Volleyball">Volleyball</option>
              <option value="Table Tennis">Table Tennis</option>
              <option value="Handball">Handball</option>
              <option value="Futsal">Futsal</option>
              <option value="Ice Hockey">Ice Hockey</option>
            </select>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
              onChange={(e) => setGroup(e.target.value)}
            >
              <option value="All Groups">All Groups</option>
              <option value="Group 1">Group 1</option>
              <option value="Group 2">Group 2</option>
              <option value="Group 3">Group 3</option>
              <option value="Group 4">Group 4</option>
              <option value="Group 5">Group 5</option>
              <option value="Group 6">Group 6</option>
              <option value="Group 7">Group 7</option>
              <option value="Group 8">Group 8</option>
              <option value="Group 9">Group 9</option>
              <option value="Group 10">Group 10</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </section>
          <section className="flex gap-1 items-center">
            <button
              className="px-4 py-1.5 rounded-md bg-[#777] text-black"
              disabled
            >
              Remove
            </button>
            <button className="px-4 py-1.5 rounded-md bg-[#bbb] hover:bg-[#aaa] text-black">
              Set Default
            </button>
          </section>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
          {tableList.map((item: any, index: number) => {
            return (
              <section key={index} className="flex flex-col gap-4">
                <GroupTable tableList={item} />
                <button
                  className="w-fit mx-auto px-4 py-1.5 rounded-md bg-[#777] text-black"
                  disabled
                >
                  Confirm
                </button>
              </section>
            );
          })}
        </section>
      </section>
    </Modal>
  );
};

export default ModalDelay;

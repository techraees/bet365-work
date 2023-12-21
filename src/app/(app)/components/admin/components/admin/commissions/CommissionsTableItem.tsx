import { useState } from "react";

import Input from "../../ui/Input";

interface CommissionsTableItemProps {
  item: any;
}

const CommissionsTableItem = ({ item }: CommissionsTableItemProps) => {
  const [contract, setContract] = useState("B");
  const [sport, setSport] = useState("");
  const [slots, setSlots] = useState("");
  const [casino, setCasino] = useState("");
  const [comments, setComments] = useState("");

  return (
    <tr className="text-white bg-[#777] hover:cursor-pointer">
      <td className="px-2 py-1 border border-gray-600 truncate">
        {item.username}
      </td>
      <td className="px-2 py-1 border border-gray-600 truncate">{item.role}</td>
      <td className="!p-0 w-28 border border-gray-600">
        <select
          className="bg-gray-50 py-2.5 h-full border w-28 border-gray-300 text-gray-900 text-xs block focus:ring-0 focus:border-gray-300"
          value={contract}
          onChange={(e) => setContract(e.target.value)}
        >
          <option value="B">B</option>
          <option value="R.S.">R.S.</option>
          <option value="N.R.S">N.R.S</option>
          <option value="T.O">T.O</option>
        </select>
      </td>
      <td className="!p-0 w-28 border border-gray-600 text-black">
        <Input
          className="bg-white border-gray-300 w-full h-9 p-2 focus:ring-0 focus:border-gray-300 text-sm"
          placeholder="Percent"
          disable_value={false}
          value={sport}
          onHandleChange={(e: any) => setSport(e.target.value)}
        />
      </td>
      <td className="!p-0 w-28 border border-gray-600 text-black">
        <Input
          className="bg-white border-gray-300 w-full h-9 p-2 focus:ring-0 focus:border-gray-300 text-sm"
          placeholder="Percent"
          disable_value={false}
          value={slots}
          onHandleChange={(e: any) => setSlots(e.target.value)}
        />
      </td>
      <td className="!p-0 w-28 border border-gray-600 text-black">
        <Input
          className="bg-white border-gray-300 w-full h-9 p-2 focus:ring-0 focus:border-gray-300 text-sm"
          placeholder="Percent"
          disable_value={false}
          value={casino}
          onHandleChange={(e: any) => setCasino(e.target.value)}
        />
      </td>
      <td className="!p-0 w-[30%] border border-gray-600 text-black">
        <Input
          className="bg-white border-gray-300 w-48 md:w-full h-9 p-2 focus:ring-0 focus:border-gray-300 text-sm"
          placeholder=""
          disable_value={false}
          value={comments}
          onHandleChange={(e: any) => setComments(e.target.value)}
        />
      </td>
      <td className="px-2 py-1 border border-gray-600"></td>
      <td className="w-48 border border-gray-600">
        <button className="button px-2 py-2 bg-[#333] hover:bg-[#444] w-full">
          Save
        </button>
      </td>
    </tr>
  );
};

export default CommissionsTableItem;

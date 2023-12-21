import { useState } from "react";

import Input from "../../ui/Input";

interface RakesTableItemProps {
  item: any;
}

const RakesTableItem = ({ item }: RakesTableItemProps) => {
  const [rakeName, setRakeName] = useState(item?.rake_name);
  const [rtp, setRtp] = useState(item?.rtp);

  return (
    <tr className="text-white bg-[#777]">
      <td className="w-32 border border-gray-600 truncate">
        <button className="w-full border border-black px-2 py-2 bg-[#333] hover:bg-[#444]">
          {item.rake_id}
        </button>
      </td>
      <td className="!p-0 w-48 border border-gray-600 text-black">
        <Input
          className="bg-white border-gray-300 w-full p-2 focus:ring-0 focus:border-gray-300 text-sm text-center"
          placeholder=""
          disable_value={false}
          value={rakeName}
          onHandleChange={(e: any) => setRakeName(e.target.value)}
        />
      </td>
      <td className="!p-0 w-28 border border-gray-600 text-black">
        <Input
          className="bg-white border-gray-300 w-full p-2 focus:ring-0 focus:border-gray-300 text-sm text-center"
          placeholder=""
          disable_value={false}
          value={rtp}
          onHandleChange={(e: any) => setRtp(e.target.value)}
        />
      </td>
      <td className="px-2 py-1 border border-gray-600 truncate">
        {item.return_bonus}
      </td>
      <td className="px-2 py-1 border border-gray-600 truncate">
        {item.amount}
      </td>
      <td className="px-2 py-1 border border-gray-600 truncate">{item.date}</td>
      <td className="w-6 border border-gray-600">
        <div className="flex gap-0.5">
          <button className="button w-24 px-2 py-2 bg-[#333] border border-black hover:bg-[#444]">
            Save
          </button>
          <button className="button w-24 px-2 py-2 bg-[#333] border border-black hover:bg-[#444]">
            Reset
          </button>
        </div>
      </td>
    </tr>
  );
};

export default RakesTableItem;

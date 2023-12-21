import { useState } from "react";

interface SportsTableItemProps {
  item: any;
  onHandleTranslateClick: any;
}

const SportsTableItem = ({
  item,
  onHandleTranslateClick,
}: SportsTableItemProps) => {
  const [active, setActive] = useState(item.active);

  return (
    <tr className="text-white bg-[#777]">
      <td className="px-2 py-1 border border-gray-600 truncate">{item.sport_id}</td>
      <td className="px-2 py-1 border border-gray-600 truncate">{item.sport}</td>
      <td className="px-2 py-1 border border-gray-600 truncate">
        <input
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
          defaultChecked={active === true ? true : false}
          onClick={() => setActive(!active)}
        />
      </td>
      <td className="px-2 py-1 border border-gray-600 bg-white text-black">
        {item.order}
      </td>
      <td className="w-48 border border-gray-600">
        <button
          className="button px-2 py-2 bg-green-700 hover:bg-green-600 w-full"
          onClick={() => onHandleTranslateClick(item)}
        >
          Translate
        </button>
      </td>
    </tr>
  );
};

export default SportsTableItem;

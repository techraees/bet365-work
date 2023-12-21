import { useState } from "react";

interface SlotsTableItemProps {
  item: any;
  onHandleEditClick: any;
}

const SlotsTableItem = ({ item, onHandleEditClick }: SlotsTableItemProps) => {
  const [type, setType] = useState(item?.type);

  return (
    <>
      <td className="px-2 py-1.5 border border-gray-600 truncate">{item.id}</td>
      <td className="px-2 py-1.5 border border-gray-600 truncate">
        {item.name}
      </td>
      <td className="w-36 !p-0 border border-gray-600 truncate">
        <select
          className="w-full bg-gray-50 py-2.5 h-full border border-gray-300 text-gray-900 text-xs block focus:ring-0 focus:border-gray-300"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Select Type">Select Type</option>
          <option value="slot">slot</option>
          <option value="roulette">roulette</option>
        </select>
      </td>
      <td className="px-2 py-1.5 border border-gray-600 truncate bg-white text-black">
        {item.order}
      </td>
      <td className="px-2 py-1.5 border border-gray-600 truncate">
        {item.listed}
      </td>
      <td className="px-2 py-1.5 border border-gray-600 truncate">
        {item.open_count}
      </td>
      <td className="px-2 py-1.5 border border-gray-600 truncate">
        {item.played}
      </td>
      <td className="px-2 py-1.5 border border-gray-600 truncate">
        {item.changed}
      </td>
      <td className="w-24 border border-gray-600 truncate">
        <button
          type="button"
          className="w-full bg-brand-button text-brand-button-text hover:text-white px-2 md:px-4 h-9 border border-black"
          onClick={() => onHandleEditClick(item)}
        >
          Edit
        </button>
      </td>
    </>
  );
};

export default SlotsTableItem;

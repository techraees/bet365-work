import { useState } from "react";

interface CasinoTableItemProps {
  item: any;
  onHandleEditClick: any;
}

const CasinoTableItem = ({ item, onHandleEditClick }: CasinoTableItemProps) => {
  const [active, setActive] = useState(item?.active);

  return (
    <>
      <td className="px-2 py-1.5 border border-gray-600 truncate">{item.id}</td>
      <td className="px-2 py-1.5 border border-gray-600 truncate">
        {item.name}
      </td>
      <td className="px-2 py-1.5 border border-gray-600 truncate">
        {item.display_name}
      </td>
      <td className="px-2 py-1.5 border border-gray-600 truncate">
        {item.aggregator}
      </td>
      <td className="px-2 py-1.5 border border-gray-600 truncate bg-white text-black">
        {item.order}
      </td>
      <td className="px-2 py-1.5 border border-gray-600 truncate">
        <input
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
          defaultChecked={active === true ? true : false}
          onClick={() => setActive(!active)}
        />
      </td>
      <td className="px-2 py-1.5 border border-gray-600 truncate">
        {item.last_edit}
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

export default CasinoTableItem;

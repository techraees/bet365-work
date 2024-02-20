import { limitSlot } from "@/app/(app)/admin/api/tools";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface SlotsTableItemProps {
  item: any;
  onHandleEditClick: any;
}

const SlotsTableItem = ({ item, onHandleEditClick }: SlotsTableItemProps) => {
  const [type, setType] = useState(item?.type);
  const [active, setActive] = useState(item?.status)

  const { data: session }: any = useSession();
  const upd_date = new Date(item?.updated_at)
  const readable_upd_date = upd_date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  }); 

  const toggleActive = () => {
    limitSlot(session.user.token, session.user.role, item.api_id, !active)
    console.log({hh2:active})
    setActive(!active)
  };

  return (
    <>
      <td className="px-2 py-1.5 border border-gray-600 truncate">{item.api_id}</td>
      <td className="px-2 py-1.5 border border-gray-600 truncate">
        {item.name}
      </td>
      <td className="px-2 py-1.5 border border-gray-600 truncate bg-white text-black">
        {item.order}
      </td>
      <td className="px-2 py-1.5 border border-gray-600 truncate">
        {item.open_count}
      </td>
      <td className="px-2 py-1.5 border border-gray-600 truncate">
        {item.played}
      </td>
      <td className="px-2 py-1.5 border border-gray-600 truncate">
        {readable_upd_date}
      </td>
      <td className="px-2 py-1.5 border border-gray-600 truncate">
        <input
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
          defaultChecked={active === true ? true : false}
          onClick={() => toggleActive()}

        />
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

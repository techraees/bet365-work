interface ExcludeEventsTableItemProps {
  item: any;
  onHandleDeleteClick: any;
}

const ExcludeEventsTableItem = ({ item, onHandleDeleteClick }: ExcludeEventsTableItemProps) => {
  return (
    <tr className="text-white bg-[#777]">
      <td className="px-2 py-1 border border-gray-600 truncate">{item.event}</td>
      <td className="px-2 py-1 border border-gray-600 truncate">{item.agent}</td>
      <td className="px-2 py-1 border border-gray-600 truncate">{item.time}</td>
      <td className="w-48 border border-gray-600">
        <div className="flex gap-0.5">
          <button className="button px-2 py-2 bg-[#333] hover:bg-[#444] w-full"
            onClick={() => onHandleDeleteClick(item.event)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ExcludeEventsTableItem;

interface EventStatisticsTableItemProps {
  item: any;
  onHandleStatisticsClick: any;
}

const EventStatisticsTableItem = ({ item, onHandleStatisticsClick }: EventStatisticsTableItemProps) => {
  return (
    <tr className="text-white bg-[#777]">
      <td className="px-2 py-1 border border-gray-600 truncate">{item.sport}</td>
      <td className="px-2 py-1 border border-gray-600 truncate">{item.pregame_event_id}</td>
      <td className="px-2 py-1 border border-gray-600 truncate">{item.live_event_id}</td>
      <td className="px-2 py-1 border border-gray-600 truncate">{item.pregame_timestamp}</td>
      <td className="px-2 py-1 border border-gray-600 truncate">{item.pregame_event_name}</td>
      <td className="px-2 py-1 border border-gray-600 truncate">{item.status}</td>
      <td className="w-48 border border-gray-600">
        <div className="flex gap-0.5">
          <button className="button px-2 py-2 bg-green-700 hover:bg-green-600 w-full truncate"
            onClick={() => onHandleStatisticsClick(item)}
          >
            {"Statistics (" + item.status + ")"}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default EventStatisticsTableItem;

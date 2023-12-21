import { useState } from "react";

interface LeagueTableItemProps {
  item: any;
}

const SortGroupsTableItem = ({
  item,
}: LeagueTableItemProps) => {
  const [group, setGroup] = useState(item.group);

  return (
    <tr className="text-white bg-[#777]">
      <td className="px-2 py-1 border border-gray-600 truncate">{item.sport}</td>
      <td className="px-2 py-1 border border-gray-600 truncate">{item.country}</td>
      <td className="px-2 py-1 border border-gray-600 truncate">
        {item.id}
      </td>
      <td className="px-2 py-1 border border-gray-600 truncate">{item.league}</td>
      <td className="!p-0 w-28 border border-gray-600 truncate">
        <select
          className="bg-gray-50 py-2.5 h-full border w-28 border-gray-300 text-gray-900 text-xs block focus:ring-0 focus:border-gray-300"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        >
          <option value="Group1">Group1</option>
          <option value="Group2">Group2</option>
          <option value="Group3">Group3</option>
          <option value="Group4">Group4</option>
          <option value="Group5">Group5</option>
          <option value="Group6">Group6</option>
          <option value="Group7">Group7</option>
          <option value="Group8">Group8</option>
          <option value="Group9">Group9</option>
          <option value="Group10">Group10</option>
        </select>
      </td>
    </tr>
  );
};

export default SortGroupsTableItem;

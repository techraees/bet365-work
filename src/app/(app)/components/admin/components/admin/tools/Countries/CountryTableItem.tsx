import { useState } from "react";

interface CountryTableItemProps {
  item: any;
  onHandleTranslateClick: any;
}

const CountryTableItem = ({ item, onHandleTranslateClick }: CountryTableItemProps) => {
  const [group, setGroup] = useState("No Group");

  return (
    <tr className="text-white bg-[#777]">
      <td className="px-2 py-1 border border-gray-600 truncate">{item.bet_country_id}</td>
      <td className="px-2 py-1 border border-gray-600 truncate">{item.bet_country_name}</td>
      <td className="px-2 py-1 border border-gray-600 bg-white text-black">
        {item.order}
      </td>
      <td className="!p-0 w-28 border border-gray-600">
        <select
          className="bg-gray-50 py-2.5 h-full border border-gray-300 text-gray-900 text-xs block focus:ring-0 focus:border-gray-300"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        >
          <option value="No Group">No Group</option>
          <option value="Main Countries">Main Countries</option>
          <option value="Internationals">Internationals</option>
          <option value="Rest of Europe">Rest of Europe</option>
          <option value="Asia">Asia</option>
          <option value="North and Central America">North and Central America</option>
          <option value="South America">South America</option>
          <option value="Oceania">Oceania</option>
          <option value="Africa">Africa</option>
        </select>
      </td>
      <td className="w-48 border border-gray-600">
        <div className="flex gap-0.5">
          <button className="button px-2 py-2 bg-green-700 hover:bg-green-600 w-full"
            onClick={() => onHandleTranslateClick(item)}
          >
            Translate
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CountryTableItem;

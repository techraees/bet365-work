import { useState } from "react";

interface LeagueTableItemProps {
  item: any;
  onHandleTranslateClick: any;
}

const LeagueTableItem = ({
  item,
  onHandleTranslateClick,
}: LeagueTableItemProps) => {
  return (
    <tr className="text-white bg-[#777]">
      <td className="px-2 py-1 border border-gray-600 truncate">{item.league_sport_id}</td>
      <td className="px-2 py-1 border border-gray-600 truncate">{item.country_id}</td>
      <td className="px-2 py-1 border border-gray-600 truncate">
        {item.league_display_name}
      </td>
      <td className="px-2 py-1 border border-gray-600 truncate">{item.bet_league_id}</td>
      <td className="px-2 py-1 border border-gray-600 bg-white text-black">
      </td>
      <td className="w-48 border border-gray-600">
        <button
          className="button px-2 py-2 bg-green-700 hover:bg-green-600 w-full"
          onClick={() => onHandleTranslateClick()}
        >
          Translate
        </button>
      </td>
    </tr>
  );
};

export default LeagueTableItem;

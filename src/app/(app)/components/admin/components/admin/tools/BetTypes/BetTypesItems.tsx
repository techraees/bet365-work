import { useState } from "react";

interface BetTypesItemProps {
  item: any;
  onHandleGroupClick: () => void;
  onHandleTranslateClick: (item: any) => void;
}

const BetTypesItems = ({ item, onHandleGroupClick, onHandleTranslateClick }: BetTypesItemProps) => {
  const [actPre, setActPre] = useState(item.act_pre);
  const [actLive, setActLive] = useState(item.act_live);
  const [cashout, setCashout] = useState(item.cashout);
  const [betCat, setBetCat] = useState(item.bet_cat);

  return (
    <tr className="text-white bg-[#777]">
      <td className="px-2 py-1 border border-gray-600 truncate">{item.id}</td>
      <td className="px-2 py-1 border border-gray-600 truncate">{item.name}</td>
      <td className="px-2 py-1 border border-gray-600 truncate">{item.sport}</td>
      <td className="px-2 py-1 border border-gray-600 truncate">
        <input
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
          defaultChecked={actPre === true ? true : false}
          onClick={() => setActPre(!actPre)}
        />
      </td>
      <td className="px-2 py-1 border border-gray-600 truncate">
        <input
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
          defaultChecked={actLive === true ? true : false}
          onClick={() => setActLive(!actLive)}
        />
      </td>
      <td className="px-2 py-1 border border-gray-600 truncate">
        <input
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
          defaultChecked={cashout === true ? true : false}
          onClick={() => setCashout(!cashout)}
        />
      </td>
      <td className="px-2 py-1 border border-gray-600 bg-white text-black">
        {item.order}
      </td>
      <td className="px-2 py-1 border border-gray-600 bg-white text-black">
        {item.bet_set}
      </td>
      <td className="!p-0 w-28 border border-gray-600">
        <select
          className="bg-gray-50 py-2.5 h-full border w-28 border-gray-300 text-gray-900 text-xs block focus:ring-0 focus:border-gray-300"
          value={betCat}
          onChange={(e) => setBetCat(e.target.value)}
        >
          <option value="Score">Score</option>
          <option value="Corner">Corner</option>
          <option value="Cards">Cards</option>
          <option value="Penalties">Penalties</option>
        </select>
      </td>
      <td className="w-48 border border-gray-600">
        <div className="flex gap-0.5">
          <button
            className="button px-2 py-2 bg-[#333] hover:bg-[#444] w-full"
            onClick={() => onHandleGroupClick()}
          >
            Group
          </button>
          <button className="button px-2 py-2 bg-[#333] hover:bg-[#444] w-full"
            onClick={() => onHandleTranslateClick(item)}
          >
            Translate
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BetTypesItems;

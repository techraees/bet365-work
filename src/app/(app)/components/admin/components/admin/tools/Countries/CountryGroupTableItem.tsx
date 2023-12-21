import { useState } from "react";

interface CountryGroupTableItemProps {
  item: any;
  onHandleRemoveClick: any;
  onHandleTranslateClick: any;
}

const CountryGroupTableItem = ({ item, onHandleRemoveClick, onHandleTranslateClick }: CountryGroupTableItemProps) => {
  const [showTitle, setShowTitle] = useState(item.show_title);
  const [showCountries, setShowCountries] = useState(item.show_countries);

  return (
    <tr className="text-white bg-[#777]">
      <td className="px-2 py-1 border border-gray-600 truncate">{item.id}</td>
      <td className="px-2 py-1 border border-gray-600 truncate">{item.name}</td>
      <td className="px-2 py-1 border border-gray-600 truncate">{item.order}</td>
      <td className="px-2 py-1 border border-gray-600 truncate">
        <input
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
          defaultChecked={showTitle === true ? true : false}
          onClick={() => setShowTitle(!showTitle)}
        />
      </td>
      <td className="px-2 py-1 border border-gray-600 truncate">
        <input
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
          defaultChecked={showCountries === true ? true : false}
          onClick={() => setShowCountries(!showCountries)}
        />
      </td>
      <td className="w-48 border border-gray-600">
        <div className="flex gap-0.5">
          <button className="button px-2 py-2 bg-green-700 hover:bg-green-600 w-full"
            onClick={() => onHandleTranslateClick(item.name)}
          >
            Translate
          </button>
          <button
            className="button px-2 py-2 bg-[#333] hover:bg-[#444] w-full"
            onClick={() => onHandleRemoveClick(item)}
          >
            Remove
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CountryGroupTableItem;

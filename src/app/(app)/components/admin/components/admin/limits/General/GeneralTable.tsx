interface GeneralTableProps {
  tableList: any;
}

const GeneralTable = ({ tableList }: GeneralTableProps) => {
  return (
    <section className="pt-4 w-full overflow-scroll md:overflow-hidden">
      <table className="w-full text-sm text-gray-400 text-center">
        <thead className="text-sm">
          <tr className="bg-brand-yellow text-black">
            <th
              colSpan={4}
              className="px-2 py-1.5 border border-gray-600 truncate"
            >
              {tableList.type}
            </th>
          </tr>
          <tr className="bg-[#333] text-white">
            <th className="px-2 py-1.5 border border-gray-600 truncate"></th>
            <th className="px-2 py-1.5 border border-gray-600 truncate">
              Single
            </th>
            <th className="px-2 py-1.5 border border-gray-600 truncate">
              Multiple
            </th>
            <th className="px-2 py-1.5 border border-gray-600 truncate">
              System
            </th>
          </tr>
        </thead>
        <tbody>
          {tableList.content.map((item: any, index: number) => {
            return (
              <tr key={index} className="text-white bg-[#777]">
                <td className="px-2 py-1 border border-gray-600 truncate">
                  {item.id}
                </td>
                <td className="px-2 py-1 bg-white text-black border border-gray-600 truncate">
                  {item.single}
                </td>
                <td className="px-2 py-1 bg-white text-black border border-gray-600 truncate">
                  {item.multiple}
                </td>
                <td className="px-2 py-1 border border-gray-600 truncate">
                  {item.system}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default GeneralTable;

interface GroupTableProps {
  tableList: any;
}

const GroupTable = ({ tableList }: GroupTableProps) => {
  return (
    <section className="pt-4 w-full overflow-scroll md:overflow-hidden">
      <table className="w-full text-sm text-gray-400 text-center">
        <thead className="text-sm">
          <tr className="bg-brand-yellow text-black">
            <th
              colSpan={6}
              className="px-2 py-1.5 border border-gray-600 truncate"
            >
              {"Group " + tableList.id}
            </th>
          </tr>
          <tr className="bg-[#333] text-white">
            <th
              colSpan={3}
              className="px-2 py-1.5 border border-gray-600 truncate"
            >
              Pre
            </th>
            <th
              colSpan={3}
              className="px-2 py-1.5 border border-gray-600 truncate"
            >
              Live
            </th>
          </tr>
          <tr className="text-white bg-[#777]">
            <td className="px-2 py-1 border border-gray-600 truncate"></td>
            <td className="px-2 py-1 border border-gray-600 truncate">Bet</td>
            <td className="px-2 py-1 border border-gray-600 truncate">Win</td>
            <td className="px-2 py-1 border border-gray-600 truncate"></td>
            <td className="px-2 py-1 border border-gray-600 truncate">Bet</td>
            <td className="px-2 py-1 border border-gray-600 truncate">Win</td>
          </tr>
        </thead>
        <tbody>
          {tableList.content.map((item: any, index: number) => {
            return (
              <tr key={index} className="text-white bg-[#777]">
                <td className="px-2 py-1 border border-gray-600 truncate">
                  {item.pre_id}
                </td>
                <td className="px-2 py-1 bg-white text-black border border-gray-600 truncate">
                  {item.pre_bet}
                </td>
                <td className="px-2 py-1 bg-white text-black border border-gray-600 truncate">
                  {item.pre_win}
                </td>
                <td className="px-2 py-1 border border-gray-600 truncate">
                  {item.live_id}
                </td>
                <td className="px-2 py-1 bg-white text-black border border-gray-600 truncate">
                  {item.live_bet}
                </td>
                <td className="px-2 py-1 bg-white text-black border border-gray-600 truncate">
                  {item.live_win}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default GroupTable;

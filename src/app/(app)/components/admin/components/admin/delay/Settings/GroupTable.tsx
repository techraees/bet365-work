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
              colSpan={3}
              className="px-2 py-1.5 border border-gray-600 truncate"
            >
              {"Group " + tableList.id}
            </th>
          </tr>
          <tr className="bg-[#333] text-white">
            <th className="px-2 py-1.5 border border-gray-600 truncate"></th>
            <th className="px-2 py-1.5 border border-gray-600 truncate">Pre</th>
            <th className="px-2 py-1.5 border border-gray-600 truncate">
              Live
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
                  {item.pre}
                </td>
                <td className="px-2 py-1 bg-white text-black border border-gray-600 truncate">
                  {item.live}
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

interface DuplicateTableProps {
  tableList: Array<any>;
  currentPage: number;
  onHandleClick: any;
}

const DuplicateTable = ({ tableList, currentPage, onHandleClick }: DuplicateTableProps) => {
  return (
    <>
      <section className="pt-4 w-full overflow-scroll md:overflow-hidden">
        {tableList?.length === 0 ? (
          <p className="text-lg font-bold text-center text-brand-button-text">
            No results
          </p>
        ) : (
          <table className="w-full text-sm text-gray-400 text-center">
            <thead className="text-sm bg-brand-yellow text-black">
              <tr>
                <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
                </th>
                <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
                  Ip
                </th>
                <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
                  Users
                </th>
              </tr>
            </thead>
            <tbody>
              {tableList.map((item: any, index: number) => {
                if (index >= currentPage * 5 && index < (currentPage + 1) * 5)
                  return (
                    <tr key={index} className="text-white bg-[#777] cursor-pointer" onClick={onHandleClick}>
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {index}
                      </td>
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.ip}
                      </td>
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.users}
                      </td>
                    </tr>
                  );
              })}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
};

export default DuplicateTable;

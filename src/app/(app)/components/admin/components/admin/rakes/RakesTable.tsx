import RakesTableItem from "./RakesTableItem";

interface RakesTableProps {
  tableList: Array<any>;
  currentPage: number;
}

const RakesTable = ({
  tableList,
  currentPage,
}: RakesTableProps) => {
  return (
    <section className="pt-4 w-full overflow-scroll md:overflow-hidden">
      {tableList?.length === 0 ? (
        <p className="text-lg font-bold text-center text-brand-button-text">
          No results
        </p>
      ) : (
        <table className="w-full text-sm text-gray-400 text-center">
          <thead className="text-sm bg-brand-yellow text-black">
            <tr>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              >
                Rake Id
              </th>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              >
                Rake Name
              </th>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              >
                RTP %
              </th>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              >
                Return Bonus
              </th>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tableList.map((item: any, index: number) => {
              if (index >= currentPage * 5 && index < (currentPage + 1) * 5)
                return <RakesTableItem key={index} item={item} />;
            })}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default RakesTable;

import CommissionsTableItem from "./CommissionsTableItem";

interface CommissionsTableProps {
  tableList: Array<any>;
  currentPage: number;
}

const CommissionsTable = ({
  tableList,
  currentPage,
}: CommissionsTableProps) => {
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
                User
              </th>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              >
                User Type
              </th>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              >
                Contract
              </th>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              >
                Sport
              </th>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              >
                Slots
              </th>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              >
                Casino
              </th>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              >
                Comments
              </th>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              >
                Last Edit
              </th>
              <th scope="col" className="px-2 py-1.5 border border-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tableList.map((item: any, index: number) => {
              if (index >= currentPage * 5 && index < (currentPage + 1) * 5)
                return <CommissionsTableItem key={index} item={item} />;
            })}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default CommissionsTable;

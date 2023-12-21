import SlotsTableItem from "./SlotsTableItem";

interface SlotsTableProps {
  tableList: Array<any>;
  currentPage: number;
  onHandleEditClick: any;
}

const SlotsTable = ({
  tableList,
  currentPage,
  onHandleEditClick,
}: SlotsTableProps) => {
  return (
    <div className="w-full overflow-x-scroll md:overflow-hidden">
      {tableList?.length === 0 ? (
        <p className="text-lg font-bold text-center text-brand-button-text">
          No results
        </p>
      ) : (
        <table className="w-full text-sm text-white text-center">
          <thead className="text-sm text-black bg-brand-yellow">
            <tr>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              >
                Id
              </th>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              >
                Order
              </th>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              >
                Listed
              </th>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              >
                Open Count
              </th>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              >
                Played
              </th>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              >
                Changed
              </th>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              ></th>
            </tr>
          </thead>
          <tbody>
            {tableList?.map((item, index) => {
              if (index >= currentPage * 5 && index < (currentPage + 1) * 5)
                return (
                  <tr key={index} className="bg-[#666] text-white">
                    <SlotsTableItem
                      item={item}
                      onHandleEditClick={(item: any) => onHandleEditClick(item)}
                    />
                  </tr>
                );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SlotsTable;

import CategoryItems from "./CategoryItems";

interface CategoryTableProps {
  tableList: Array<any>;
  currentPage: number;
}

const CategoryTable = ({ tableList, currentPage }: CategoryTableProps) => {
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
                  Id
                </th>
                <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
                  Name
                </th>
                <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
                  Changed
                </th>
                <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
                  Order
                </th>
                <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tableList.map((item: any, index: number) => {
                if (index >= currentPage * 5 && index < (currentPage + 1) * 5)
                  return <CategoryItems key={index} item={item} />;
              })}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
};

export default CategoryTable;

interface TransactionTableProps {
  currentPage: number;
  transactionData: Array<any>;
}

const TransactionTable = ({ currentPage, transactionData }: TransactionTableProps) => {
  return (
    <div className="w-full overflow-x-scroll md:overflow-hidden">
      <table className="w-full text-sm text-white text-center">
        <thead className="text-sm bg-brand-yellow text-black">
          <tr>
            <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
              Date
            </th>
            <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
              Description
            </th>
            <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
              Type
            </th>
            <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
              Kind
            </th>
            <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {transactionData?.map((item, index) => {
            if (index >= currentPage * 5 && index < (currentPage + 1) * 5)
              return (
                <tr key={index} className="bg-[#666]">
                  <td className="px-2 py-1 border border-gray-600 truncate">{`${new Date(item.timestamp).getMonth() + 1}/${new Date(item.timestamp).getDate()} ${new Date(item.timestamp).getHours()}:${new Date(item.timestamp).getMinutes()}`}</td>
                  <td className="px-2 py-1 border border-gray-600 truncate">
                    {`${item.action_user_id}•${item.action_user_username} - ${item.comment} - ${item.target_user_id}•${item.target_user_username}`}
                  </td>
                  <td className="px-2 py-1 border border-gray-600 truncate"></td>
                  <td className="px-2 py-1 border border-gray-600 truncate"></td>
                  <td className="px-2 py-1 border border-gray-600 truncate"></td>
                </tr>
              );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;

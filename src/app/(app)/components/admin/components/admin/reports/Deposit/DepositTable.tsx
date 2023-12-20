interface DepositTableProps {
  currentPage: number;
}

const DepositTable = ({ currentPage }: DepositTableProps) => {
  return (
    <div className="w-full overflow-x-scroll md:overflow-hidden">
      <table className="w-full text-sm text-white text-center">
        <thead className="text-sm bg-brand-yellow text-black">
          <tr>
            <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
              Id
            </th>
            <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
              User
            </th>
            <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
              Method
            </th>
            <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
              Amount
            </th>
            <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
              Date
            </th>
            <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
              Description
            </th>
            <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {deposit_table?.map((item, index) => {
            if (index >= currentPage * 5 && index < (currentPage + 1) * 5)
              return (
                <tr key={index} className="bg-[#666]">
                  <td className="px-2 py-1 border border-gray-600 truncate">{item.id}</td>
                  <td className="px-2 py-1 border border-gray-600 truncate">{item.user}</td>
                  <td className="px-2 py-1 border border-gray-600 truncate">{item.method}</td>
                  <td className="px-2 py-1 border border-gray-600 truncate">{item.amount}</td>
                  <td className="px-2 py-1 border border-gray-600 truncate">{item.date}</td>
                  <td className="px-2 py-1 border border-gray-600 truncate">
                    {item.description}
                  </td>
                  <td className="px-2 py-1 border border-gray-600 truncate">{item.status}</td>
                </tr>
              );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DepositTable;

const deposit_table = [
  {
    id: "333",
    user: "cryptoRoshan",
    method: "VPOS Voucher",
    amount: "10.00 EUR",
    date: "08/09/2023 07:55:05",
    description: "7112892833014897",
    status: "Success",
  },
  {
    id: "334",
    user: "cryptoRoshan",
    method: "VPOS Voucher",
    amount: "10.00 EUR",
    date: "08/09/2023 07:55:05",
    description: "7112892833014897",
    status: "Success",
  },
  {
    id: "335",
    user: "cryptoRoshan",
    method: "VPOS Voucher",
    amount: "10.00 EUR",
    date: "08/09/2023 07:55:05",
    description: "7112892833014897",
    status: "Success",
  },
  {
    id: "336",
    user: "cryptoRoshan",
    method: "VPOS Voucher",
    amount: "10.00 EUR",
    date: "08/09/2023 07:55:05",
    description: "7112892833014897",
    status: "Success",
  },
  {
    id: "337",
    user: "cryptoRoshan",
    method: "VPOS Voucher",
    amount: "10.00 EUR",
    date: "08/09/2023 07:55:05",
    description: "7112892833014897",
    status: "Success",
  },
  {
    id: "338",
    user: "cryptoRoshan",
    method: "VPOS Voucher",
    amount: "10.00 EUR",
    date: "08/09/2023 07:55:05",
    description: "7112892833014897",
    status: "Success",
  },
  {
    id: "339",
    user: "cryptoRoshan",
    method: "VPOS Voucher",
    amount: "10.00 EUR",
    date: "08/09/2023 07:55:05",
    description: "7112892833014897",
    status: "Success",
  },
  {
    id: "340",
    user: "cryptoRoshan",
    method: "VPOS Voucher",
    amount: "10.00 EUR",
    date: "08/09/2023 07:55:05",
    description: "7112892833014897",
    status: "Success",
  },
];

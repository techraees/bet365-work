import { useState } from "react";
import ModalCasinoTransaction from "../CasinoTransactions/ModalCasinoTransaction";
import { useModalContext } from "../../../../contexts/ModalContext";

interface CasinoTransactionsTableProps {
  tableList: Array<any>;
  currentPage: number;
}

const CasinoTransactionsTable = ({
  tableList,
  currentPage,
}: CasinoTransactionsTableProps) => {
  const { openCasinoTransactionModal } = useModalContext();
  const [selectedItem, setSelectedItem] = useState(null);

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
                  User
                </th>
                <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
                  Date
                </th>
                <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
                  Type
                </th>
                <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
                  Bet
                </th>
                <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
                  Win
                </th>
                <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
                  Balance
                </th>
                <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
                  Provider
                </th>
                <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
                  Game
                </th>
                <th scope="col" className="px-2 py-1.5 border border-gray-600 truncate">
                  Round
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-brand-dark-grey text-white">
                <td className="px-2 py-1 border border-gray-600 truncate"></td>
                <td className="px-2 py-1 border border-gray-600 truncate">
                  Players: 36
                </td>
                <td className="px-2 py-1 border border-gray-600 truncate"></td>
                <td className="px-2 py-1 border border-gray-600 truncate"></td>
                <td className="px-2 py-1 border border-gray-600 truncate">
                  Total Bet: 31,572.69
                </td>
                <td className="px-2 py-1 border border-gray-600 truncate">
                  Total Win: 32,884.40
                </td>
                <td className="px-2 py-1 border border-gray-600 truncate">
                  Total: -1,311.71
                </td>
                <td className="px-2 py-1 border border-gray-600 truncate"></td>
                <td className="px-2 py-1 border border-gray-600 truncate">Games: 144</td>
                <td className="px-2 py-1 border border-gray-600 truncate"></td>
              </tr>
              {tableList.map((item: any, index: number) => {
                if (index >= currentPage * 5 && index < (currentPage + 1) * 5)
                  return (
                    <tr
                      key={index}
                      className="text-white bg-[#777] hover:cursor-pointer"
                      onClick={() => {
                        setSelectedItem(item);
                        openCasinoTransactionModal();
                      }}
                    >
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.id}
                      </td>
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.user}
                      </td>
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.date}
                      </td>
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.type}
                      </td>
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.bet_amount}
                      </td>
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.win_amount}
                      </td>
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.balance}
                      </td>
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.vendor}
                      </td>
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.game}
                      </td>
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.round}
                      </td>
                    </tr>
                  );
              })}
            </tbody>
          </table>
        )}
      </section>
      <ModalCasinoTransaction item={selectedItem} />
    </>
  );
};

export default CasinoTransactionsTable;

import { Modal } from "antd";

import { useModalContext } from "../../../../contexts/ModalContext";

const ModalCasinoTransaction = ({ item }: any) => {
  const { isCasinoTransactionModalOpen, closeCasinoTransactionModal } = useModalContext();

  return (
    <Modal
      title={"Casino Transaction (" + item?.id + ")"}
      open={isCasinoTransactionModalOpen}
      onCancel={closeCasinoTransactionModal}
      footer={[
        <div key="close" className="flex justify-center">
          <button
            className="px-4 py-1.5 rounded-md bg-brand-dialog-button"
            onClick={closeCasinoTransactionModal}
          >
            Close
          </button>
        </div>,
      ]}
    >
      <section className="flex flex-col gap-4 bg-brand-dialog items-center pt-4 px-4">
        {item !== null && (
          <section className="flex flex-col bg-brand-dialog items-center px-2 w-full">
            <div className="flex gap-2 md:gap-4 justify-center h-10 w-full text-white">
              <p className="w-full text-right m-auto">User</p>
              <p className="w-full m-auto">{item.user}</p>
            </div>
            <div className="flex gap-2 md:gap-4 justify-center h-10 w-full text-white">
              <p className="w-full text-right m-auto">Date</p>
              <p className="w-full m-auto">{item.date}</p>
            </div>
            <div className="flex gap-2 md:gap-4 justify-center h-10 w-full text-white">
              <p className="w-full text-right m-auto">Type</p>
              <p className="w-full m-auto">{item.type}</p>
            </div>
            <div className="flex gap-2 md:gap-4 justify-center h-10 w-full text-white">
              <p className="w-full text-right m-auto">Bet</p>
              <p className="w-full m-auto">{item.bet_amount}</p>
            </div>
            <div className="flex gap-2 md:gap-4 justify-center h-10 w-full text-white">
              <p className="w-full text-right m-auto">Win</p>
              <p className="w-full m-auto">{item.win_amount}</p>
            </div>
            <div className="flex gap-2 md:gap-4 justify-center h-10 w-full text-white">
              <p className="w-full text-right m-auto">Balance</p>
              <p className="w-full m-auto">{item.balance}</p>
            </div>
            <div className="flex gap-2 md:gap-4 justify-center h-10 w-full text-white">
              <p className="w-full text-right m-auto">Provider</p>
              <p className="w-full m-auto">{item.vendor}</p>
            </div>
            <div className="flex gap-2 md:gap-4 justify-center h-10 w-full text-white">
              <p className="w-full text-right m-auto">Game</p>
              <p className="w-full m-auto">{item.game}</p>
            </div>
            <div className="flex gap-2 md:gap-4 justify-center h-10 w-full text-white">
              <p className="w-full text-right m-auto">Round</p>
              <p className="w-full m-auto">{item.round}</p>
            </div>
            <div className="flex gap-2 md:gap-4 justify-center h-10 w-full text-white">
              <p className="w-full text-right m-auto">Description</p>
              <p className="w-full m-auto">{item.description}</p>
            </div>
            <div className="flex gap-2 md:gap-4 justify-center h-10 w-full text-white">
              <p className="w-full text-right m-auto">History</p>
              <button className="button bg-white rounded-md w-full text-black">Game View</button>
            </div>
          </section>
        )}
      </section>
    </Modal>
  );
};

export default ModalCasinoTransaction;

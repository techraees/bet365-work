import { Modal } from "antd";

import { useModalContext } from "../../../../contexts/ModalContext";

const ModalGameTransaction = ({ item }: any) => {
  const { isGameTransactionModalOpen, closeGameTransactionModal } = useModalContext();

  return (
    <Modal
      title={"Game Transaction (" + item?._id + ")"}
      open={isGameTransactionModalOpen}
      onCancel={closeGameTransactionModal}
      footer={[
        <div key="close" className="flex justify-center">
          <button
            className="px-4 py-1.5 rounded-md bg-brand-dialog-button"
            onClick={closeGameTransactionModal}
          >
            Close
          </button>
        </div>,
      ]}
    >
      <section className="flex flex-col gap-4 bg-brand-dialog items-center pt-4">
        {item !== null && (
          <section className="flex flex-col bg-brand-dialog items-center px-2 w-full">
            <div className="flex gap-2 md:gap-4 justify-center h-10 w-full text-white">
              <p className="w-full text-right m-auto">User</p>
              <p className="w-full m-auto">{item.user_id}</p>
            </div>
            <div className="flex gap-2 md:gap-4 justify-center h-10 w-full text-white">
              <p className="w-full text-right m-auto">Date</p>
              <p className="w-full m-auto">{new Date(item.updated_at).toString()}</p>
            </div>
            <div className="flex gap-2 md:gap-4 justify-center h-10 w-full text-white">
              <p className="w-full text-right m-auto">Type</p>
              <p className="w-full m-auto">{item.label}</p>
            </div>
            <div className="flex gap-2 md:gap-4 justify-center h-10 w-full text-white">
              <p className="w-full text-right m-auto">Bet</p>
              <p className="w-full m-auto">{item.bet}</p>
            </div>
            <div className="flex gap-2 md:gap-4 justify-center h-10 w-full text-white">
              <p className="w-full text-right m-auto">Win</p>
              <p className="w-full m-auto">{item.win}</p>
            </div>
            <div className="flex gap-2 md:gap-4 justify-center h-10 w-full text-white">
              <p className="w-full text-right m-auto">Balance</p>
              <p className="w-full m-auto">{item.new_balance}</p>
            </div>
            <div className="flex gap-2 md:gap-4 justify-center h-10 w-full text-white">
              <p className="w-full text-right m-auto">Provider</p>
              <p className="w-full m-auto">{item.label}</p>
            </div>
            <div className="flex gap-2 md:gap-4 justify-center h-10 w-full text-white">
              <p className="w-full text-right m-auto">Game</p>
              <p className="w-full m-auto">{item.game_id}</p>
            </div>
          </section>
        )}
      </section>
    </Modal>
  );
};

export default ModalGameTransaction;

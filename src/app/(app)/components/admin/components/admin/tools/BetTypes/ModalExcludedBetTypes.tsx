import { Modal } from "antd";

import { useModalContext } from "../../../../contexts/ModalContext";

const ModalExcludedBetTypes = () => {
  const { isExcludedBetTypesModalOpen, closeExcludedBetTypesModal } =
    useModalContext();

  return (
    <Modal
      title="Excluded Bet Types"
      open={isExcludedBetTypesModalOpen}
      onCancel={closeExcludedBetTypesModal}
      footer={[
      ]}
    >
      <section className="flex flex-col gap-4 bg-brand-dialog items-center pt-4 px-4">
        <p className="text-lg font-bold text-center text-brand-button-text">
          No results
        </p>
      </section>
    </Modal>
  );
};

export default ModalExcludedBetTypes;

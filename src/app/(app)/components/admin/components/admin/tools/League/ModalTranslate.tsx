import { Modal } from "antd";

import { useModalContext } from "../../../../contexts/ModalContext";

const ModalTranslate = ({ item }: { item: any }) => {
  const { isTranslateModalOpen, closeTranslateModal } = useModalContext();

  return (
    <Modal
      title={"Translate - " + item?.league_display_name}
      open={isTranslateModalOpen}
      onCancel={closeTranslateModal}
      footer={[
        <div key="Save" className="flex gap-2 justify-center">
          <button
            className="px-4 py-1.5 rounded-md bg-[#333] text-brand-light-grey"
            onClick={closeTranslateModal}
          >
            Save
          </button>
        </div>,
      ]}
    >
      <section className="flex flex-col gap-4 bg-brand-dialog items-center pt-4 px-4">
        <table className="w-full text-sm text-white bg-[#666] text-center">
          <thead className="text-sm bg-brand-yellow text-black">
            <tr>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              >
                Language
              </th>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              >
                Name
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="cursor-pointer">
              <td className="px-2 py-1.5 border border-gray-600">
                en
              </td>
              <td className="px-2 py-1.5 border border-gray-600 bg-white text-black">
                {item?.display_name_en}
              </td>
            </tr>
            <tr className="cursor-pointer">
              <td className="px-2 py-1.5 border border-gray-600">
                tr
              </td>
              <td className="px-2 py-1.5 border border-gray-600 bg-white text-black">
                {item?.display_name_de}
              </td>
            </tr>
            <tr className="cursor-pointer">
              <td className="px-2 py-1.5 border border-gray-600">
                de
              </td>
              <td className="px-2 py-1.5 border border-gray-600 bg-white text-black">
                {item?.display_name_tr}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </Modal>
  );
};

export default ModalTranslate;


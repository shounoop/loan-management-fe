import { Button, Modal } from 'antd';

const ModalConfirmDelete = (props) => {
  const {
    open,
    title = 'Confirm Delete',
    handleOkModalDelete,
    handleCancelModalDelete,
    content,
    isDeleting,
  } = props;

  return (
    <Modal
      open={open}
      title={title}
      onCancel={handleCancelModalDelete}
      footer={() => (
        <>
          <Button onClick={handleCancelModalDelete}>Hủy</Button>

          <Button
            type="primary"
            danger
            loading={isDeleting}
            onClick={handleOkModalDelete}
            disabled={isDeleting}
          >
            Xóa
          </Button>
        </>
      )}
    >
      <p>{content}</p>
    </Modal>
  );
};

export default ModalConfirmDelete;

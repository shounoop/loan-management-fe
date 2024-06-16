import { Button, Col, Form, Input, Modal, Row } from 'antd';

const ModalLoanMethodCreateEdit = (props) => {
  const {
    initialValues = {},
    isOpenModalCreateEdit,
    handleOkModalCreateEdit,
    isSpinningModalCreateEdit,
    handleCancelModalCreateEdit,
  } = props;

  const [form] = Form.useForm();

  const onFinish = (values) => {
    const payload = {
      loan_method_name: values.loan_method_name,
      loan_method_desc: values.loan_method_desc,
      loan_method_id: initialValues.loan_method_id,
    };

    handleOkModalCreateEdit(payload);
  };

  const isEditModal = !!initialValues.loan_method_id;

  return (
    <Modal
      title={isEditModal ? 'Sửa phương thức vay' : 'Tạo phương thức vay'}
      open={isOpenModalCreateEdit}
      onOk={handleOkModalCreateEdit}
      onCancel={handleCancelModalCreateEdit}
      width={800}
      footer={null}
    >
      <Form
        initialValues={initialValues}
        className="mt-3"
        form={form}
        layout="vertical"
        name="control-hooks"
        onFinish={onFinish}
      >
        <Form.Item
          name="loan_method_name"
          label="Tên phương thức"
          rules={[
            {
              required: true,
              message: 'Tên phương thức không được để trống',
            },
          ]}
          hasFeedback
        >
          <Input className="input-box" placeholder="Nhập tên phương thức vay" />
        </Form.Item>

        <Form.Item
          name="loan_method_desc"
          label="Mô tả"
          rules={[
            {
              required: true,
              message: 'Mô tả không được để trống',
            },
          ]}
          hasFeedback
        >
          <Input.TextArea
            rows={13}
            className="input-box"
            placeholder="Nhập mô tả phương thức vay"
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Row justify="end" gutter={8}>
            <Col>
              <Button
                style={{ minWidth: '80px' }}
                onClick={handleCancelModalCreateEdit}
              >
                Hủy
              </Button>
            </Col>

            <Col>
              <Button
                type="primary"
                htmlType="submit"
                loading={isSpinningModalCreateEdit}
                style={{ minWidth: '80px' }}
              >
                {isEditModal ? 'Sửa' : 'Tạo'}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalLoanMethodCreateEdit;

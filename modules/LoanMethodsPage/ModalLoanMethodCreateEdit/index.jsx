import { Button, Col, Form, Input, Modal, Row } from 'antd';

const ModalLoanMethodCreateEdit = (props) => {
  const {
    initialValues = {},
    isOpenModalCreateEdit,
    handleOkModalCreateEdit,
    isSpinningModalCreateEdit,
    handleCancelModalCreateEdit,
  } = props;

  const isEditModal = !!initialValues.loan_method_id;

  const [form] = Form.useForm();

  const onFinish = (values) => {
    const payload = {
      loan_method_name: values.loan_method_name,
      loan_method_desc: values.loan_method_desc,
      loan_method_id: initialValues.loan_method_id,
    };

    handleOkModalCreateEdit(payload);
  };

  const formProps = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const lastFormItemProps = {
    wrapperCol: { offset: 8, span: 16 },
  };

  return (
    <Modal
      title={`${isEditModal ? 'Chỉnh Sửa' : 'Tạo'} Phương Thức Vay`}
      open={isOpenModalCreateEdit}
      onOk={handleOkModalCreateEdit}
      onCancel={handleCancelModalCreateEdit}
      footer={null}
    >
      <Form
        initialValues={initialValues}
        className="mt-3"
        {...formProps}
        form={form}
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
          <Input className="input-box" />
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
          <Input.TextArea rows={4} className="input-box" />
        </Form.Item>

        <Form.Item {...lastFormItemProps} style={{ marginBottom: 0 }}>
          <Row justify="end" gutter={8}>
            <Col>
              <Button onClick={handleCancelModalCreateEdit}>Hủy</Button>
            </Col>

            <Col>
              <Button
                type="primary"
                htmlType="submit"
                loading={isSpinningModalCreateEdit}
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

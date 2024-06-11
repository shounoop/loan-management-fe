import { Button, Col, Form, Input, Modal, Row } from 'antd';

const ModalLoanTypeCreateEdit = (props) => {
  const {
    initialValues = {},
    isOpenModalCreateEdit,
    handleOkModalCreateEdit,
    isSpinningModalCreateEdit,
    handleCancelModalCreateEdit,
    textOk,
    title,
  } = props;

  const [form] = Form.useForm();

  const onFinish = (values) => {
    const payload = {
      loan_type_name: values.loan_type_name,
      loan_type_desc: values.loan_type_desc,
      loan_type_id: initialValues.loan_type_id,
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
      title={title}
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
          name="loan_type_name"
          label="Mục đích vay"
          rules={[
            {
              required: true,
              message: 'Mục đích vay không được để trống',
            },
          ]}
          hasFeedback
        >
          <Input className="input-box" placeholder="Nhập tên phương thức vay" />
        </Form.Item>

        <Form.Item
          name="loan_type_desc"
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
            rows={4}
            className="input-box"
            placeholder="Nhập mô tả phương thức vay"
          />
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
                {textOk}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalLoanTypeCreateEdit;

import { Button, Col, Form, Input, Modal, Row } from 'antd';

const ModalLoanMethodCreate = (props) => {
  const {
    isOpenModalCreate,
    handleOkModalCreate,
    isCreating,
    handleCancelModalCreate,
  } = props;

  const [form] = Form.useForm();

  const onFinish = (values) => {
    handleOkModalCreate(values);
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
      title="Tạo Phương Thức Vay"
      open={isOpenModalCreate}
      onOk={handleOkModalCreate}
      isCreating={isCreating}
      onCancel={handleCancelModalCreate}
      footer={null}
    >
      <Form
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
              <Button onClick={handleCancelModalCreate}>Hủy</Button>
            </Col>

            <Col>
              <Button type="primary" htmlType="submit" loading={isCreating}>
                Tạo
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalLoanMethodCreate;

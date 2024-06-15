import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';

const ModalLoanApplicationCreateEdit = (props) => {
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
      ...initialValues,
      ...values,
    };

    handleOkModalCreateEdit(payload);
  };

  const isEditModal = !!initialValues.payment_id;

  return (
    <Modal
      title={isEditModal ? 'Sửa đơn vay' : 'Tạo đơn vay'}
      open={isOpenModalCreateEdit}
      onOk={handleOkModalCreateEdit}
      onCancel={handleCancelModalCreateEdit}
      footer={null}
      width={800}
    >
      <Form
        initialValues={initialValues}
        className="mt-3"
        layout="vertical"
        form={form}
        name="control-hooks"
        onFinish={onFinish}
      >
        <Row justify="space-between" gutter={24}>
          <Col span={12}>
            <Form.Item
              name="loan_product_id"
              label="loan_product_id"
              rules={[
                {
                  required: true,
                  message: 'loan_product_id!',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input-box"
                placeholder="loan_product_id"
                defaultValue={initialValues.loan_product_id}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="customer_id"
              label="customer_id"
              rules={[
                {
                  required: true,
                  message: 'customer_id!',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input-box"
                placeholder="customer_id"
                defaultValue={initialValues.customer_id}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="payment_date"
              label="payment_date"
              rules={[
                {
                  required: true,
                  message: 'payment_date!',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input-box"
                placeholder="payment_date"
                defaultValue={initialValues.payment_date}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="loan_term"
              label="loan_term"
              rules={[
                {
                  required: true,
                  message: 'loan_term!',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input-box"
                placeholder="loan_term"
                defaultValue={initialValues.loan_term}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="principal_amount"
              label="principal_amount"
              rules={[
                {
                  required: true,
                  message: 'principal_amount!',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input-box"
                placeholder="principal_amount"
                defaultValue={initialValues.principal_amount}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="remaining_balance"
              label="remaining_balance"
              rules={[
                {
                  required: true,
                  message: 'remaining_balance!',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input-box"
                placeholder="remaining_balance"
                defaultValue={initialValues.remaining_balance}
              />
            </Form.Item>
          </Col>
        </Row>

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
      </Form>
    </Modal>
  );
};

export default ModalLoanApplicationCreateEdit;

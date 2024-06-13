import { Button, Col, Form, Input, Modal, Row } from 'antd';

const ModalLoanTypeCreateEdit = (props) => {
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
      loan_type_name: values.loan_type_name,
      loan_type_desc: values.loan_type_desc,
      interest_rate: values.interest_rate,
      late_interest_fee: values.late_interest_fee,
      prepay_interest_fee: values.prepay_interest_fee,
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

  const isEditModal = !!initialValues.loan_type_id;

  return (
    <Modal
      title={isEditModal ? 'Sửa mục đích vay' : 'Tạo mục đích vay'}
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
          <Input className="input-box" placeholder="Nhập tên mục đích vay" />
        </Form.Item>

        <Form.Item
          name="interest_rate"
          label="Lãi suất"
          rules={[
            {
              required: true,
              message: 'Lãi suất không được để trống',
            },
          ]}
          hasFeedback
        >
          <Input className="input-box" placeholder="Nhập lãi suất" />
        </Form.Item>

        <Form.Item
          name="late_interest_fee"
          label="Phí phạt nộp trễ hạn"
          rules={[
            {
              required: true,
              message: 'Phí phạt nộp trễ hạn không được để trống',
            },
          ]}
          hasFeedback
        >
          <Input
            className="input-box"
            placeholder="Nhập phí phạt nộp trễ hạn"
          />
        </Form.Item>

        <Form.Item
          name="prepay_interest_fee"
          label="Phí phạt trả trước"
          rules={[
            {
              required: true,
              message: 'Phí phạt trả trước không được để trống',
            },
          ]}
          hasFeedback
        >
          <Input className="input-box" placeholder="Nhập phí phạt trả trước" />
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
            placeholder="Nhập mô tả mục đích vay"
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
                {isEditModal ? 'Sửa' : 'Tạo'}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalLoanTypeCreateEdit;

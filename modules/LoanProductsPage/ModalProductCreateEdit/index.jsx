import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';

const ModalProductCreateEdit = (props) => {
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

  const formProps = {
    labelCol: { span: 11 },
    wrapperCol: { span: 15 },
  };

  const lastFormItemProps = {
    wrapperCol: { offset: 11, span: 15 },
  };

  const isEditModal = !!initialValues.loan_product_id;

  return (
    <Modal
      title={isEditModal ? 'Sửa sản phẩm vay' : 'Tạo sản phẩm vay'}
      open={isOpenModalCreateEdit}
      onOk={handleOkModalCreateEdit}
      onCancel={handleCancelModalCreateEdit}
      footer={null}
      width={800}
    >
      <Form
        initialValues={initialValues}
        className="mt-3"
        {...formProps}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
      >
        <Row justify="space-between">
          <Col>
            <Form.Item
              name="loan_product_name"
              label="Tên sản phẩm vay"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên sản phẩm vay!',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input-box"
                placeholder="Nhập tên sản phẩm vay"
                defaultValue={initialValues.loan_product_name}
              />
            </Form.Item>

            <Form.Item
              name="interest_rate"
              label="Tỷ lệ lãi suất"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tỷ lệ lãi suất!',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input-box"
                placeholder="Nhập tỷ lệ lãi suất"
                defaultValue={initialValues.interest_rate}
              />
            </Form.Item>

            <Form.Item
              name="minimum_amount"
              label="Số tiền tối thiểu"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số tiền tối thiểu!',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input-box"
                placeholder="Nhập số tiền tối thiểu"
                defaultValue={initialValues.minimum_amount}
              />
            </Form.Item>

            <Form.Item
              name="maximum_amount"
              label="Số tiền tối đa"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số tiền tối đa!',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input-box"
                placeholder="Nhập số tiền tối đa"
                defaultValue={initialValues.maximum_amount}
              />
            </Form.Item>

            <Form.Item
              name="minimum_term"
              label="Kỳ hạn tối thiểu"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập kỳ hạn tối thiểu!',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input-box"
                placeholder="Nhập kỳ hạn tối thiểu"
                defaultValue={initialValues.minimum_term}
              />
            </Form.Item>

            <Form.Item
              name="maximum_term"
              label="Kỳ hạn tối đa"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập kỳ hạn tối đa!',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input-box"
                placeholder="Nhập kỳ hạn tối đa"
                defaultValue={initialValues.maximum_term}
              />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              name="repayment_schedule"
              label="Chu kỳ trả nợ"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập chu kỳ trả nợ!',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input-box"
                placeholder="Nhập chu kỳ trả nợ"
                defaultValue={initialValues.repayment_schedule}
              />
            </Form.Item>

            <Form.Item
              name="eligibility_criteria"
              label="Tiêu chí đủ điều kiện"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tiêu chí đủ điều kiện!',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input-box"
                placeholder="Nhập tiêu chí đủ điều kiện"
                defaultValue={initialValues.eligibility_criteria}
              />
            </Form.Item>

            <Form.Item
              name="product_description"
              label="Mô tả"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mô tả!',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input-box"
                placeholder="Nhập mô tả"
                defaultValue={initialValues.product_description}
              />
            </Form.Item>

            <Form.Item
              name="additional_notes"
              label="Ghi chú thêm"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập ghi chú thêm!',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input-box"
                placeholder="Nhập ghi chú thêm"
                defaultValue={initialValues.additional_notes}
              />
            </Form.Item>

            <Form.Item
              name="late_fee"
              label="Phí trễ hạn"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập phí trễ hạn!',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input-box"
                placeholder="Nhập phí trễ hạn"
                defaultValue={initialValues.late_fee}
              />
            </Form.Item>

            <Form.Item
              name="status"
              label="Trạng thái"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập trạng thái!',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input-box"
                placeholder="Nhập trạng thái"
                defaultValue={initialValues.status}
              />
            </Form.Item>
          </Col>
        </Row>

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

export default ModalProductCreateEdit;

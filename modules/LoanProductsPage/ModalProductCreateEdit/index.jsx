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
        layout="vertical"
        form={form}
        name="control-hooks"
        onFinish={onFinish}
      >
        <Row justify="space-between" gutter={24}>
          <Col span={24}>
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
          </Col>

          <Col span={12}>
            <Form.Item
              name="loan_method_id"
              label="Phương thức vay"
              rules={[
                {
                  required: true,
                  message: 'Phương thức vay không được để trống',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input-box"
                placeholder="Nhập phương thức vay"
                defaultValue={initialValues.loan_method_id}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="loan_type_id"
              label="Mục đích vay"
              rules={[
                {
                  required: true,
                  message: 'Mục đích vay không được để trống',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input-box"
                placeholder="Nhập mục đích vay"
                defaultValue={initialValues.loan_type_id}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
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
          </Col>

          <Col span={12}>
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
          </Col>

          <Col span={12}>
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
          </Col>

          <Col span={12}>
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

          <Col span={12}>
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
          </Col>

          <Col span={12}>
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
          </Col>

          <Col span={12}>
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
          </Col>

          <Col span={12}>
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
              <Select
                className="input-box"
                placeholder="Chọn trạng thái"
                defaultValue={initialValues.status}
              >
                <Select.Option value={1}>Đang hoạt động</Select.Option>
                <Select.Option value={2}>Không hoạt động</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
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
              <Input.TextArea
                rows={4}
                className="input-box"
                placeholder="Nhập mô tả"
                defaultValue={initialValues.product_description}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
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
              <Input.TextArea
                rows={4}
                className="input-box"
                placeholder="Nhập ghi chú thêm"
                defaultValue={initialValues.additional_notes}
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
              size="large"
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

export default ModalProductCreateEdit;

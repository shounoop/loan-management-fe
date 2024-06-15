import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';

const ModalCustomerCreateEdit = (props) => {
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
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const lastFormItemProps = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const isEditModal = !!initialValues.customer_id;

  return (
    <Modal
      title={isEditModal ? 'Sửa khách hàng' : 'Tạo khách hàng'}
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
          name="full_name"
          label="Tên khách hàng"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên khách hàng!',
            },
          ]}
          hasFeedback
        >
          <Input className="input-box" placeholder="Nhập tên khách hàng" />
        </Form.Item>

        <Form.Item
          name="date_of_birth"
          label="Ngày sinh"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập ngày sinh',
            },
          ]}
          hasFeedback
        >
          <Input
            className="input-box"
            placeholder="Nhập ngày sinh"
            defaultValue={initialValues.date_of_birth}
          />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Giới tính"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập giới tính',
            },
          ]}
          hasFeedback
        >
          <Select
            className="input-box"
            placeholder="Chọn giới tính"
            defaultValue={initialValues.gender}
          >
            <Select.Option value="Male">Nam</Select.Option>
            <Select.Option value="Female">Nữ</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="identity_number"
          label="Số CMND"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập số CMND',
            },
          ]}
          hasFeedback
        >
          <Input
            className="input-box"
            placeholder="Nhập số CMND"
            defaultValue={initialValues.identity_number}
          />
        </Form.Item>

        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập địa chỉ',
            },
          ]}
          hasFeedback
        >
          <Input
            className="input-box"
            placeholder="Nhập địa chỉ"
            defaultValue={initialValues.address}
          />
        </Form.Item>

        <Form.Item
          name="phone_number"
          label="SĐT"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập SĐT',
            },
          ]}
          hasFeedback
        >
          <Input
            className="input-box"
            placeholder="Nhập SĐT"
            defaultValue={initialValues.phone_number}
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập email',
            },
          ]}
          hasFeedback
        >
          <Input
            className="input-box"
            placeholder="Nhập email"
            defaultValue={initialValues.email}
          />
        </Form.Item>

        <Form.Item
          name="occupation"
          label="Nghề nghiệp"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập nghề nghiệp',
            },
          ]}
          hasFeedback
        >
          <Input
            className="input-box"
            placeholder="Nhập nghề nghiệp"
            defaultValue={initialValues.occupation}
          />
        </Form.Item>

        <Form.Item
          name="customer_status"
          label="Trạng thái"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập trạng thái',
            },
          ]}
          hasFeedback
        >
          <Select
            className="input-box"
            placeholder="Chọn trạng thái"
            defaultValue={initialValues.customer_status}
          >
            <Select.Option value="active">Hoạt động</Select.Option>
            <Select.Option value="inactive">Không hoạt động</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item {...lastFormItemProps} style={{ marginBottom: 0 }}>
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
                style={{ minWidth: '80px' }}
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

export default ModalCustomerCreateEdit;

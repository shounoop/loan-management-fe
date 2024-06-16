import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';

const ModalUserCreateEdit = (props) => {
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

  const isEditModal = !!initialValues.id;

  return (
    <Modal
      title={isEditModal ? 'Sửa người dùng' : 'Tạo người dùng'}
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
              name="username"
              label="Tên tài khoản"
              rules={[
                {
                  required: true,
                  message: 'Tên tài khoản không được để trống!',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input-box"
                placeholder="Tên tài khoản"
                defaultValue={initialValues.username}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: 'Email không được để trống!',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input-box"
                placeholder="Email"
                defaultValue={initialValues.email}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="role"
              label="Quyền"
              rules={[
                {
                  required: true,
                  message: 'Quyền không được để trống!',
                },
              ]}
              hasFeedback
            >
              <Select
                className="input-box"
                placeholder="Chọn quyền"
                defaultValue={initialValues.role}
                mode="multiple"
                style={{ width: '100%' }}
              >
                <Select.Option value="SUPER_ADMIN">SUPER_ADMIN</Select.Option>

                <Select.Option value="ADMIN">ADMIN</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="password" label="Mật khẩu" hasFeedback>
              <Input.Password
                className="input-box"
                placeholder="Mật khẩu"
                defaultValue={initialValues.password}
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

export default ModalUserCreateEdit;

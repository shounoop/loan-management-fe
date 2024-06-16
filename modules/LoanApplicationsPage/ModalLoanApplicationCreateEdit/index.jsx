import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import { useEffect, useState } from 'react';
import API_URL from '@/constants/api-url';
import useAxios from '@/utils/axios';

const ModalLoanApplicationCreateEdit = (props) => {
  const {
    initialValues = {},
    isOpenModalCreateEdit,
    handleOkModalCreateEdit,
    isSpinningModalCreateEdit,
    handleCancelModalCreateEdit,
  } = props;
  const { http } = useAxios();

  const [loanProducts, setLoanProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  const statusOptions = [
    { label: 'Đang chờ xử lý', value: 1 },
    { label: 'Đã phê duyệt', value: 2 },
    { label: 'Đã giải ngân', value: 3 },
    { label: 'Đã thanh toán xong', value: 4 },
    { label: 'Trễ hạn', value: 5 },
    { label: 'Đã bị hủy', value: 6 },
  ];

  const [form] = Form.useForm();

  useEffect(() => {
    (async () => {
      try {
        const res = await http.get(API_URL.LOAN_PRODUCT);

        const data = res?.data?.infor?.data;

        if (data) {
          setLoanProducts(data);
        }
      } catch (error) {
        console.error(error);
      }
    })();

    (async () => {
      try {
        const res = await http.get(API_URL.CUSTOMER);

        const metadata = res?.data?.metadata;

        if (metadata) {
          setCustomers(metadata);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

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
              label="Sản phẩm vay"
              rules={[
                {
                  required: true,
                  message: 'Sản phẩm vay không được để trống',
                },
              ]}
              hasFeedback
            >
              <Select
                className="input-box"
                placeholder="Sản phẩm vay"
                defaultValue={initialValues.loan_product_id}
              >
                {loanProducts.map((item) => (
                  <Select.Option
                    key={item.loan_product_id}
                    value={item.loan_product_id}
                  >
                    {item.loan_product_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="customer_id"
              label="Khách hàng"
              rules={[
                {
                  required: true,
                  message: 'Khách hàng không được để trống',
                },
              ]}
              hasFeedback
            >
              <Select
                className="input-box"
                placeholder="Khách hàng"
                defaultValue={initialValues.customer_id}
              >
                {customers.map((item) => (
                  <Select.Option
                    key={item.customer_id}
                    value={item.customer_id}
                  >
                    {item.full_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="payment_date"
              label="Hạn thanh toán"
              rules={[
                {
                  required: true,
                  message: 'Hạn thanh toán không được để trống!',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input-box"
                placeholder="Hạn thanh toán"
                defaultValue={initialValues.payment_date}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="loan_term"
              label="Kỳ hạn thanh toán (tháng)"
              rules={[
                {
                  required: true,
                  message: 'Kỳ hạn thanh toán không được để trống!',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input-box"
                placeholder="Kỳ hạn thanh toán"
                defaultValue={initialValues.loan_term}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="principal_amount"
              label="Nợ gốc ban đầu"
              rules={[
                {
                  required: true,
                  message: 'Nợ gốc ban đầu không được để trống!',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input-box"
                placeholder="Nợ gốc ban đầu"
                defaultValue={initialValues.principal_amount}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="remaining_balance"
              label="Số dư còn lại"
              rules={[
                {
                  required: true,
                  message: 'Số dư còn lại không được để trống!',
                },
              ]}
              hasFeedback
            >
              <Input
                className="input-box"
                placeholder="Số dư còn lại"
                defaultValue={initialValues.remaining_balance}
              />
            </Form.Item>
          </Col>

          {isEditModal && (
            <Col span={12}>
              <Form.Item
                name="payment_status"
                label="Trạng thái"
                rules={[
                  {
                    required: true,
                    message: 'Trạng thái không được để trống',
                  },
                ]}
                hasFeedback
              >
                <Select
                  className="input-box"
                  placeholder="Trạng thái"
                  defaultValue={initialValues.payment_status}
                >
                  {statusOptions.map((item) => (
                    <Select.Option key={item.value} value={item.value}>
                      {item.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}
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

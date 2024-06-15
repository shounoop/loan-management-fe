import HeadingWrapper from '@/components/HeadingWrapper';
import styles from './Index.module.scss';
import { Button, Col, Input, Row, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import useAxios from '@/utils/axios';
import ModalCustomerCreateEdit from './ModalCustomerCreateEdit';
import ModalConfirmDelete from '@/components/ModalConfirmDelete';
import API_URL from '@/constants/api-url';
import MyToast from '@mdrakibul8001/toastify';

const { Search } = Input;

const defaultValues = {
  full_name: 'John Wick',
  date_of_birth: '2003-08-28',
  gender: 'Male',
  identity_number: 'ID1234567899',
  address: 'New York, USA',
  phone_number: '0936045045',
  email: 'johnwick@gmail.com',
  occupation: 'Developer',
  customer_status: 1,
};

const CustomersPage = () => {
  const { http } = useAxios();
  const { notify } = MyToast();

  const [isOpenModalCreateEdit, setIsOpenModalCreateEdit] = useState(false);
  const [isSpinningModalCreateEdit, setIsSpinningModalCreateEdit] =
    useState(false);
  const [isOpenModalConfirmDelete, setIsOpenModalConfirmDelete] =
    useState(false);
  const [isGettingList, setIsGettingList] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [initialValues, setInitialValues] = useState(defaultValues);
  const [deleteCustomerId, setDeleteCustomerId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    getList();
  }, []);

  const openModalDelete = () => {
    setIsOpenModalConfirmDelete(true);
  };

  const handleOkModalDelete = async () => {
    try {
      setIsDeleting(true);

      await http.delete(`${API_URL.CUSTOMER}/${deleteCustomerId}`);

      // Refresh data
      getList();

      notify('info', 'Xóa khách hàng thành công!');
    } catch (error) {
      console.error(error);

      notify('error', 'Có lỗi xảy ra!');
    } finally {
      setIsDeleting(false);
    }

    setIsOpenModalConfirmDelete(false);
  };

  const handleCancelModalDelete = () => {
    setIsOpenModalConfirmDelete(false);
  };

  const openModalCreate = () => {
    setIsOpenModalCreateEdit(true);

    setInitialValues(defaultValues);
  };

  const getList = async () => {
    try {
      setIsGettingList(true);
      const res = await http.get(API_URL.CUSTOMER);

      const metadata = res?.data?.metadata;

      if (metadata) {
        setCustomers(metadata);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsGettingList(false);
    }
  };

  const handleOkModalCreateEdit = async (payload) => {
    try {
      setIsSpinningModalCreateEdit(true);

      const customer_id = payload.customer_id;

      if (customer_id) {
        await http.post(`${API_URL.CUSTOMER}/${customer_id}`, {
          ...payload,
          customer_id: undefined,
        });

        notify('info', 'Cập nhật khách hàng thành công!');
      } else {
        await http.post(API_URL.CUSTOMER, payload);

        notify('info', 'Tạo khách hàng thành công!');
      }

      // Refresh data
      getList();

      setIsOpenModalCreateEdit(false);
    } catch (error) {
      console.log(error);

      notify('error', 'Có lỗi xảy ra!');
    } finally {
      setIsSpinningModalCreateEdit(false);
    }
  };

  const handleCancelModalCreateEdit = () => {
    setIsOpenModalCreateEdit(false);
  };

  const onSearch = (value, _e, info) => {
    console.log(info?.source, value);
  };

  const onClickEdit = (record) => {
    setInitialValues({
      ...defaultValues,
      ...record,
    });

    setIsOpenModalCreateEdit(true);
  };

  const onClickDelete = (record) => {
    setDeleteCustomerId(record.customer_id);
    openModalDelete();
  };

  const columns = [
    {
      title: 'ID',
      align: 'center',
      dataIndex: 'customer_id',
      ellipsis: true,
      fixed: 'left',
      width: 80,
    },
    {
      title: 'Tên',
      dataIndex: 'full_name',
      ellipsis: true,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      ellipsis: true,
    },
    {
      title: 'Trạn thái',
      dataIndex: 'customer_status',
      ellipsis: true,
      render: (status) => {
        return (
          <Tag color={status === 1 ? 'green' : 'red'}>
            {status === 1 ? 'Đang hoạt động' : 'Không hoạt động'}
          </Tag>
        );
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      ellipsis: true,
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      ellipsis: true,
    },
    {
      title: 'Số CMND',
      dataIndex: 'identity_number',
      ellipsis: true,
    },
    {
      title: 'Nghề nghiệp',
      dataIndex: 'occupation',
      ellipsis: true,
    },
    {
      title: 'SĐT',
      dataIndex: 'phone_number',
      ellipsis: true,
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      fixed: 'right',
      // width: 180,
      render: (_, record) => (
        <Row align="middle" gutter={8}>
          <Col>
            <Button type="default" onClick={() => onClickEdit(record)}>
              Sửa
            </Button>
          </Col>

          <Col>
            <Button danger onClick={() => onClickDelete(record)}>
              Xóa
            </Button>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <div className={styles.wrapper}>
      <HeadingWrapper
        title="Quản lý khách hàng"
        onClickCreate={openModalCreate}
      />

      <Row justify="end" className={styles.search_wrapper}>
        <Search
          placeholder="Nhập từ khóa tìm kiếm..."
          onSearch={onSearch}
          size="middle"
          bordered
          cellSpacing="0"
          style={{ width: 300 }}
        />
      </Row>

      <div className={styles.table_wrapper}>
        <Table
          dataSource={customers}
          columns={columns}
          loading={isGettingList}
          pagination={customers.length > 7 ? { pageSize: 7 } : false}
          scroll={{ x: 1500 }}
          rowKey={(record) => record.customer_id}
        />
      </div>

      <>
        {isOpenModalCreateEdit && (
          <ModalCustomerCreateEdit
            initialValues={initialValues}
            isOpenModalCreateEdit={isOpenModalCreateEdit}
            handleOkModalCreateEdit={handleOkModalCreateEdit}
            isSpinningModalCreateEdit={isSpinningModalCreateEdit}
            handleCancelModalCreateEdit={handleCancelModalCreateEdit}
          />
        )}

        {isOpenModalConfirmDelete && (
          <ModalConfirmDelete
            open={isOpenModalConfirmDelete}
            title="Xác Nhận Xoá"
            handleOkModalDelete={handleOkModalDelete}
            handleCancelModalDelete={handleCancelModalDelete}
            content="Bạn có chắc chắn muốn xóa khách hàng này?"
            isDeleting={isDeleting}
          />
        )}
      </>
    </div>
  );
};

export default CustomersPage;

import HeadingWrapper from '@/components/HeadingWrapper';
import styles from './Index.module.scss';
import { Button, Col, Input, Row, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import useAxios from '@/utils/axios';
import ModalUserCreateEdit from './ModalUserCreateEdit';
import ModalConfirmDelete from '@/components/ModalConfirmDelete';
import API_URL from '@/constants/api-url';
import MyToast from '@mdrakibul8001/toastify';

const { Search } = Input;

const defaultValues = {
  username: 'admin',
  email: 'admin@gmail.com',
  role: ['SUPER_ADMIN'],
  password: '123123',
};

const UsersPage = () => {
  const { http } = useAxios();
  const { notify } = MyToast();

  const [isOpenModalCreateEdit, setIsOpenModalCreateEdit] = useState(false);
  const [isSpinningModalCreateEdit, setIsSpinningModalCreateEdit] =
    useState(false);
  const [isOpenModalConfirmDelete, setIsOpenModalConfirmDelete] =
    useState(false);
  const [isGettingList, setIsGettingList] = useState(false);
  const [users, setUsers] = useState([]);
  const [initialValues, setInitialValues] = useState(defaultValues);
  const [deleteUserId, setDeleteUserId] = useState(null);
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

      await http.delete(`${API_URL.USER}/${deleteUserId}`);

      notify('info', 'Xóa đơn vay thành công!');

      // Refresh data
      getList();
    } catch (error) {
      console.error(error);

      notify('error', 'Xóa đơn vay thất bại!');
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
      const res = await http.get(API_URL.USER);

      const data = res?.data;

      if (data) {
        setUsers(data);
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

      const userId = payload.id;

      if (userId) {
        const editPayload = {
          ...payload,
          id: undefined,
          password: payload.password || undefined,
        };

        await http.put(`${API_URL.USER}/${userId}`, editPayload);

        notify('info', 'Cập nhật đơn vay thành công!');
      } else {
        await http.post(API_URL.USER, payload);

        notify('info', 'Tạo mới đơn vay thành công!');
      }

      // Refresh data
      getList();

      setIsOpenModalCreateEdit(false);
    } catch (error) {
      console.log(error);

      notify('error', 'Tạo mới đơn vay thất bại!');
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
    setDeleteUserId(record.id);
    openModalDelete();
  };

  const columns = [
    {
      title: 'ID',
      align: 'center',
      dataIndex: 'id',
      fixed: 'left',
      width: 80,
    },
    {
      title: 'Tên tài khoản',
      dataIndex: 'username',
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      ellipsis: true,
    },
    {
      title: 'Quyền',
      dataIndex: 'role',
      ellipsis: true,
      render: (roles) => {
        return roles.map((role) => <Tag key={role}>{role}</Tag>);
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      fixed: 'right',
      width: 160,
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
        title="Quản lý người dùng"
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
          dataSource={users}
          columns={columns}
          loading={isGettingList}
          pagination={users.length > 7 ? { pageSize: 7 } : false}
          // scroll={{ x: 2200 }}
          rowKey={(record) => record.id}
        />
      </div>

      <>
        {isOpenModalCreateEdit && (
          <ModalUserCreateEdit
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
            content="Bạn có chắc chắn muốn xóa đơn vay này?"
            isDeleting={isDeleting}
          />
        )}
      </>
    </div>
  );
};

export default UsersPage;

import HeadingWrapper from '@/components/HeadingWrapper';
import styles from './Index.module.scss';
import { Button, Col, Input, Row, Table } from 'antd';
import { useEffect, useState } from 'react';
import useAxios from '@/utils/axios';
import ModalLoanTypeCreateEdit from './ModalLoanTypeCreateEdit';
import ModalConfirmDelete from '@/components/ModalConfirmDelete';
import API_URL from '@/constants/api-url';

const { Search } = Input;

const LoanTypesPage = () => {
  const { http } = useAxios();

  const [isOpenModalCreateEdit, setIsOpenModalCreateEdit] = useState(false);
  const [isSpinningModalCreateEdit, setIsSpinningModalCreateEdit] =
    useState(false);
  const [isOpenModalConfirmDelete, setIsOpenModalConfirmDelete] =
    useState(false);
  const [isGettingList, setIsGettingList] = useState(false);
  const [loanTypes, setLoanTypes] = useState([]);
  const [initialValues, setInitialValues] = useState({});
  const [deleteTypeId, setDeleteTypeId] = useState(null);
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

      await http.delete(`${API_URL.LOAN_TYPE}/${deleteTypeId}`);

      // Refresh data
      getList();
    } catch (error) {
      console.error(error);
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

    setInitialValues({});
  };

  const getList = async () => {
    try {
      setIsGettingList(true);
      const res = await http.get(API_URL.LOAN_TYPE);

      console.log('res', res);

      const data = res?.data?.infor?.data;

      if (data) {
        setLoanTypes(data);
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

      if (payload.loan_type_id) {
        await http.put(API_URL.LOAN_TYPE, payload);
      } else {
        await http.post(API_URL.LOAN_TYPE, payload);
      }

      // Refresh data
      getList();

      setIsOpenModalCreateEdit(false);
    } catch (error) {
      console.log(error);
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
      loan_type_id: record.loan_type_id,
      loan_type_name: record.loan_type_name,
      loan_type_desc: record.loan_type_desc,
    });

    setIsOpenModalCreateEdit(true);
  };

  const onClickDelete = (record) => {
    setDeleteTypeId(record.loan_type_id);
    openModalDelete();
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'loan_type_id',
    },
    {
      title: 'Mục đích vay',
      dataIndex: 'loan_type_name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'loan_type_desc',
    },
    {
      title: 'Actions',
      key: 'action',
      width: 180,
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

  const isEditModal = !!initialValues.loan_type_id;

  return (
    <div className={styles.wrapper}>
      <HeadingWrapper
        title="Quản lý mục đích vay"
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
          dataSource={loanTypes}
          columns={columns}
          loading={isGettingList}
          pagination={false}
          rowKey={(record) => record.loan_type_id}
        />
      </div>

      <>
        {isOpenModalCreateEdit && (
          <ModalLoanTypeCreateEdit
            title={isEditModal ? 'Sửa mục đích vay' : 'Tạo mục đích vay'}
            textOk={isEditModal ? 'Sửa' : 'Tạo'}
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
            content="Bạn có chắc chắn muốn xóa mục đích vay này?"
            isDeleting={isDeleting}
          />
        )}
      </>
    </div>
  );
};

export default LoanTypesPage;

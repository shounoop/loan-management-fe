import HeadingWrapper from '@/components/HeadingWrapper';
import styles from './Index.module.scss';
import { Button, Col, Input, Row, Table } from 'antd';
import { useEffect, useState } from 'react';
import useAxios from '@/utils/axios';
import ModalLoanTypeCreateEdit from './ModalLoanTypeCreateEdit';
import ModalConfirmDelete from '@/components/ModalConfirmDelete';
import API_URL from '@/constants/api-url';
import MyToast from '@mdrakibul8001/toastify';

const { Search } = Input;

const defaultValues = {
  loan_type_name: 'Vay xây nhà',
  loan_type_desc: 'Vay xây nhà',
  interest_rate: 0.1,
  late_interest_fee: 0.05,
  prepay_interest_fee: 0.1,
};

const LoanTypesPage = () => {
  const { http } = useAxios();
  const { notify } = MyToast();

  const [isOpenModalCreateEdit, setIsOpenModalCreateEdit] = useState(false);
  const [isSpinningModalCreateEdit, setIsSpinningModalCreateEdit] =
    useState(false);
  const [isOpenModalConfirmDelete, setIsOpenModalConfirmDelete] =
    useState(false);
  const [isGettingList, setIsGettingList] = useState(false);
  const [loanTypes, setLoanTypes] = useState([]);
  const [initialValues, setInitialValues] = useState(defaultValues);
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

      notify('info', 'Xóa mục đích vay thành công!');

      // Refresh data
      getList();
    } catch (error) {
      console.error(error);

      notify('error', 'Xóa mục đích vay thất bại!');
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
      const res = await http.get(API_URL.LOAN_TYPE);

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

        notify('info', 'Cập nhật mục đích vay thành công!');
      } else {
        await http.post(API_URL.LOAN_TYPE, payload);

        notify('info', 'Tạo mới mục đích vay thành công!');
      }

      // Refresh data
      getList();

      setIsOpenModalCreateEdit(false);
    } catch (error) {
      console.log(error);

      notify('error', 'Thao tác thất bại!');
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
    setInitialValues({ ...record });

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
      width: 150,
    },
    {
      title: 'Mô tả',
      dataIndex: 'loan_type_desc',
    },
    {
      title: 'Lãi suất',
      dataIndex: 'interest_rate',
      width: 90,
    },
    {
      title: 'Phí phạt nộp trễ hạn',
      dataIndex: 'late_interest_fee',
      width: 170,
    },
    {
      title: 'Phí phạt trả trước',
      dataIndex: 'prepay_interest_fee',
      width: 160,
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      width: 160,
      render: (_, record) => (
        <Row align="middle" gutter={8} wrap={false}>
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
          pagination={loanTypes.length > 7 ? { pageSize: 7 } : false}
          rowKey={(record) => record.loan_type_id}
        />
      </div>

      <>
        {isOpenModalCreateEdit && (
          <ModalLoanTypeCreateEdit
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

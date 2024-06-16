import HeadingWrapper from '@/components/HeadingWrapper';
import styles from './Index.module.scss';
import { Button, Col, Input, Row, Table } from 'antd';
import { useEffect, useState } from 'react';
import useAxios from '@/utils/axios';
import ModalLoanMethodCreateEdit from './ModalLoanMethodCreateEdit';
import ModalConfirmDelete from '@/components/ModalConfirmDelete';
import API_URL from '@/constants/api-url';
import MyToast from '@mdrakibul8001/toastify';

const { Search } = Input;

const LoanMethodsPage = () => {
  const { http } = useAxios();
  const { notify } = MyToast();

  const [isOpenModalCreateEdit, setIsOpenModalCreateEdit] = useState(false);
  const [isSpinningModalCreateEdit, setIsSpinningModalCreateEdit] =
    useState(false);
  const [isOpenModalConfirmDelete, setIsOpenModalConfirmDelete] =
    useState(false);
  const [isGettingList, setIsGettingList] = useState(false);
  const [loanMethods, setLoanMethods] = useState([]);
  const [initialValues, setInitialValues] = useState({});
  const [deleteMethodId, setDeleteMethodId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredLoanMethods, setFilteredLoanMethods] = useState(loanMethods);

  console.log({ searchKeyword });

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (searchKeyword) {
      const filteredData = loanMethods.filter((item) => {
        return (
          item.loan_method_name.toLowerCase().includes(searchKeyword) ||
          item.loan_method_desc.toLowerCase().includes(searchKeyword)
        );
      });

      setFilteredLoanMethods(filteredData);
    } else {
      setFilteredLoanMethods(loanMethods);
    }
  }, [loanMethods, searchKeyword]);

  const openModalDelete = () => {
    setIsOpenModalConfirmDelete(true);
  };

  const handleOkModalDelete = async () => {
    try {
      setIsDeleting(true);

      await http.delete(`${API_URL.LOAN_METHOD}/${deleteMethodId}`);

      notify('info', 'Xóa phương thức vay thành công!');

      // Refresh data
      getList();
    } catch (error) {
      console.error(error);

      notify('error', 'Xóa phương thức vay thất bại!');
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
      const res = await http.get(API_URL.LOAN_METHOD);

      const data = res?.data?.infor?.data;

      if (data) {
        setLoanMethods(data);
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

      if (payload.loan_method_id) {
        await http.put(API_URL.LOAN_METHOD, payload);

        notify('info', 'Cập nhật phương thức vay thành công!');
      } else {
        await http.post(API_URL.LOAN_METHOD, payload);

        notify('info', 'Tạo mới phương thức vay thành công!');
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

  // const onSearch = (value) => {
  //   setSearchKeyword(value);
  // };

  const onClickEdit = (record) => {
    setInitialValues({
      loan_method_id: record.loan_method_id,
      loan_method_name: record.loan_method_name,
      loan_method_desc: record.loan_method_desc,
    });

    setIsOpenModalCreateEdit(true);
  };

  const onClickDelete = (record) => {
    setDeleteMethodId(record.loan_method_id);
    openModalDelete();
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'loan_method_id',
    },
    {
      title: 'Phương thức vay',
      dataIndex: 'loan_method_name',
      width: 200,
    },
    {
      title: 'Mô tả',
      dataIndex: 'loan_method_desc',
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
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

  const onChangeSearch = (e) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <HeadingWrapper
        title="Quản lý phương thức vay"
        onClickCreate={openModalCreate}
      />

      <Row justify="end" className={styles.search_wrapper}>
        <Search
          placeholder="Nhập từ khóa tìm kiếm..."
          value={searchKeyword}
          onChange={onChangeSearch}
          // onSearch={onSearch}
          size="middle"
          bordered
          cellSpacing="0"
          style={{ width: 300 }}
        />
      </Row>

      <div className={styles.table_wrapper}>
        <Table
          dataSource={filteredLoanMethods}
          columns={columns}
          loading={isGettingList}
          pagination={filteredLoanMethods.length > 7 ? { pageSize: 7 } : false}
          rowKey={(record) => record.loan_method_id}
        />
      </div>

      <>
        {isOpenModalCreateEdit && (
          <ModalLoanMethodCreateEdit
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
            content="Bạn có chắc chắn muốn xóa phương thức vay này?"
            isDeleting={isDeleting}
          />
        )}
      </>
    </div>
  );
};

export default LoanMethodsPage;

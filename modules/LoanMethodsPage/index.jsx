import HeadingWrapper from '@/components/HeadingWrapper';
import styles from './Index.module.scss';
import { Button, Col, Input, Row, Table, Modal } from 'antd';
import { useEffect, useState } from 'react';
import useAxios from '@/utils/axios';
import ModalLoanMethodCreateEdit from './ModalLoanMethodCreateEdit';

const { Search } = Input;

const LoanMethodsPage = () => {
  const { http } = useAxios();

  const [isOpenModalCreateEdit, setIsOpenModalCreateEdit] = useState(false);
  const [isSpinningModalCreateEdit, setIsSpinningModalCreateEdit] =
    useState(false);
  const [open, setOpen] = useState(false);
  const [isGettingList, setIsGettingList] = useState(false);
  const [loanMethods, setLoanMethods] = useState([]);
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    getList();
  }, []);

  const openModalDelete = () => {
    setOpen(true);
  };

  const handleOkModalDelete = () => {
    setOpen(false);
  };

  const handleCancelModalDelete = () => {
    setOpen(false);
  };

  const openModalCreate = () => {
    setIsOpenModalCreateEdit(true);

    setInitialValues({});
  };

  const getList = async () => {
    try {
      setIsGettingList(true);
      const res = await http.get('/api/express/loan-methods');

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
        await http.put('/api/express/loan-method', payload);
      } else {
        await http.post('/api/express/loan-method', payload);
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
      loan_method_id: record.loan_method_id,
      loan_method_name: record.loan_method_name,
      loan_method_desc: record.loan_method_desc,
    });

    setIsOpenModalCreateEdit(true);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'loan_method_id',
    },
    {
      title: 'Phương thức vay',
      dataIndex: 'loan_method_name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'loan_method_desc',
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
            <Button
              danger
              onClick={() => {
                openModalDelete();
                console.log('Delete button clicked', record);
              }}
            >
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
        title="Quản lý phương thức vay"
        onClickCreate={openModalCreate}
      />

      <Row justify="end" className={styles.search_wrapper}>
        <Search
          placeholder="Nhập từ khóa tìm kiếm..."
          onSearch={onSearch}
          size="middle"
          bordered
          cellspacing="0"
          style={{ width: 300 }}
        />
      </Row>

      <div className={styles.table_wrapper}>
        <Table
          dataSource={loanMethods}
          columns={columns}
          loading={isGettingList}
          pagination={false}
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

        <Modal
          open={open}
          title="Confirm Delete"
          onOk={handleOkModalDelete}
          onCancel={handleCancelModalDelete}
          footer={() => (
            <>
              <Button>Hủy</Button>

              <Button type="primary" danger>
                Xóa
              </Button>
            </>
          )}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </>
    </div>
  );
};

export default LoanMethodsPage;

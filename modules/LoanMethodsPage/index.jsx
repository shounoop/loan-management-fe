import HeadingWrapper from '@/components/HeadingWrapper';
import styles from './Index.module.scss';
import { Button, Col, Input, Row, Table, Modal } from 'antd';
import { useEffect, useState } from 'react';
import useAxios from '@/utils/axios';
import ModalLoanMethodCreate from './ModalLoanMethodCreate';
import { useRouter } from 'next/router';

const { Search } = Input;

const LoanMethodsPage = () => {
  const { http } = useAxios();

  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [open, setOpen] = useState(false);
  const [isGettingList, setIsGettingList] = useState(false);
  const [loanMethods, setLoanMethods] = useState([]);

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
    setIsOpenModalCreate(true);
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

  const handleOkModalCreate = async (payload) => {
    try {
      setIsCreating(true);

      await http.post('/api/express/loan-method', payload);

      // Refresh data
      getList();

      setIsOpenModalCreate(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleCancelModalCreate = () => {
    console.log('Clicked cancel button');

    setIsOpenModalCreate(false);
  };

  const onSearch = (value, _e, info) => {
    console.log(info?.source, value);
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
            <Button
              type="default"
              onClick={() => {
                console.log('Edit button clicked', record);
              }}
            >
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
        {isOpenModalCreate && (
          <ModalLoanMethodCreate
            isOpenModalCreate={isOpenModalCreate}
            handleOkModalCreate={handleOkModalCreate}
            isCreating={isCreating}
            handleCancelModalCreate={handleCancelModalCreate}
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

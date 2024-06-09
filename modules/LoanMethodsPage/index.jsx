import HeadingWrapper from '@/components/HeadingWrapper';
import styles from './Index.module.scss';
import { Button, Col, Input, Row, Table, Modal } from 'antd';
import { useState } from 'react';

const { Search } = Input;

const LoanMethodsPage = () => {
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [open, setOpen] = useState(false);

  const openModalDelete = () => {
    setOpen(true);
  };
  const handleOkModalDelete = () => {
    setOpen(false);
  };
  const handleCancelModalDelete = () => {
    setOpen(false);
  };

  const openModalAdd = () => {
    setIsOpenModalAdd(true);
  };

  const handleOkModalAdd = () => {
    setIsAdding(true);

    setTimeout(() => {
      setIsOpenModalAdd(false);
      setIsAdding(false);
    }, 2000);
  };

  const handleCancelModalAdd = () => {
    console.log('Clicked cancel button');

    setIsOpenModalAdd(false);
  };

  const onSearch = (value, _e, info) => {
    console.log(info?.source, value);
  };

  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
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
        onClickAddNew={openModalAdd}
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
        <Table dataSource={dataSource} columns={columns} />;
      </div>

      <>
        <Modal
          title="Create New Loan Method"
          open={isOpenModalAdd}
          onOk={handleOkModalAdd}
          isAdding={isAdding}
          onCancel={handleCancelModalAdd}
        >
          <p>Content</p>
        </Modal>

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

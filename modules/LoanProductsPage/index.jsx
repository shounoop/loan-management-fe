import HeadingWrapper from '@/components/HeadingWrapper';
import styles from './Index.module.scss';
import { Button, Col, Input, Row, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import useAxios from '@/utils/axios';
import ModalProductCreateEdit from './ModalProductCreateEdit';
import ModalConfirmDelete from '@/components/ModalConfirmDelete';
import API_URL from '@/constants/api-url';

const { Search } = Input;

const defaultValues = {
  loan_product_name: 'Vay cá nhân',
  interest_rate: 0.18,
  minimum_amount: 100000,
  maximum_amount: 50000000,
  minimum_term: 1,
  maximum_term: 500,
  repayment_schedule: 'tháng',
  eligibility_criteria: 'Có chứng minh tư, hộ khẩu,...',
  product_description: 'Sản phẩm vay cá nhân',
  additional_notes: 'additional_notes',
  late_fee: 0.15,
  status: 'Đợi',
};

const LoanProductsPage = () => {
  const { http } = useAxios();

  const [isOpenModalCreateEdit, setIsOpenModalCreateEdit] = useState(false);
  const [isSpinningModalCreateEdit, setIsSpinningModalCreateEdit] =
    useState(false);
  const [isOpenModalConfirmDelete, setIsOpenModalConfirmDelete] =
    useState(false);
  const [isGettingList, setIsGettingList] = useState(false);
  const [loanProducts, setLoanProducts] = useState([]);
  const [initialValues, setInitialValues] = useState(defaultValues);
  const [deleteProductId, setDeleteProductId] = useState(null);
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

      await http.delete(`${API_URL.LOAN_PRODUCT}/${deleteProductId}`);

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

    setInitialValues(defaultValues);
  };

  const getList = async () => {
    try {
      setIsGettingList(true);
      const res = await http.get(API_URL.LOAN_PRODUCT);

      const data = res?.data?.infor?.data;

      if (data) {
        setLoanProducts(data);
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

      const loan_product_id = payload.loan_product_id;

      if (loan_product_id) {
        await http.post(`${API_URL.LOAN_PRODUCT}/${loan_product_id}`, {
          ...payload,
          loan_product_id: undefined,
        });
      } else {
        await http.post(API_URL.LOAN_PRODUCT, payload);
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
      ...defaultValues,
      ...record,
    });

    setIsOpenModalCreateEdit(true);
  };

  const onClickDelete = (record) => {
    setDeleteProductId(record.loan_product_id);
    openModalDelete();
  };

  const columns = [
    {
      title: 'ID',
      align: 'center',
      dataIndex: 'loan_product_id',
      // ellipsis: true,
      fixed: 'left',
      width: 80,
    },
    {
      title: 'Tên sản phẩm vay',
      dataIndex: 'loan_product_name',
      ellipsis: true,
    },
    {
      title: 'Tỷ lệ lãi suất',
      dataIndex: 'interest_rate',
      ellipsis: true,
    },
    {
      title: 'Số tiền tối thiểu',
      dataIndex: 'minimum_amount',
      ellipsis: true,
    },
    {
      title: 'Số tiền tối đa',
      dataIndex: 'maximum_amount',
      ellipsis: true,
    },
    {
      title: 'Kỳ hạn tối thiểu',
      dataIndex: 'minimum_term',
      ellipsis: true,
    },
    {
      title: 'Kỳ hạn tối đa',
      dataIndex: 'maximum_term',
      ellipsis: true,
    },
    {
      title: 'Chu kỳ trả nợ',
      dataIndex: 'repayment_schedule',
      ellipsis: true,
    },
    {
      title: 'Tiêu chí đủ điều kiện',
      dataIndex: 'eligibility_criteria',
      ellipsis: true,
    },
    {
      title: 'Mô tả sản phẩm',
      dataIndex: 'product_description',
      ellipsis: true,
    },
    {
      title: 'Ghi chú thêm',
      dataIndex: 'additional_notes',
      ellipsis: true,
    },
    {
      title: 'Phí trễ hạn',
      dataIndex: 'late_fee',
      ellipsis: true,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      ellipsis: true,
    },
    // {
    //   title: 'createdAt',
    //   dataIndex: 'createdAt',
    //   ellipsis: true,
    // },
    // {
    //   title: 'updatedAt',
    //   dataIndex: 'updatedAt',
    //   ellipsis: true,
    // },
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
        title="Quản lý sản phẩm vay"
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
          dataSource={loanProducts}
          columns={columns}
          loading={isGettingList}
          pagination={loanProducts.length > 7 ? { pageSize: 7 } : false}
          scroll={{
            // x: scrollX || true,
            x: 2500,
          }}
          rowKey={(record) => record.loan_product_id}
        />
      </div>

      <>
        {isOpenModalCreateEdit && (
          <ModalProductCreateEdit
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
            content="Bạn có chắc chắn muốn xóa sản phẩm vay này?"
            isDeleting={isDeleting}
          />
        )}
      </>
    </div>
  );
};

export default LoanProductsPage;

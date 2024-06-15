import HeadingWrapper from '@/components/HeadingWrapper';
import styles from './Index.module.scss';
import { Button, Col, Input, Row, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import useAxios from '@/utils/axios';
import ModalProductCreateEdit from './ModalProductCreateEdit';
import ModalConfirmDelete from '@/components/ModalConfirmDelete';
import API_URL from '@/constants/api-url';
import MyToast from '@mdrakibul8001/toastify';

const { Search } = Input;

const defaultValues = {
  loan_product_name: 'Loan Product 1',
  loan_method_id: 1,
  loan_type_id: 1,
  minimum_amount: 1000,
  maximum_amount: 10000,
  minimum_term: 1,
  maximum_term: 12,
  repayment_schedule: 'Tháng',
  eligibility_criteria: 'Eligibility Criteria 1',
  product_description: 'Product Description 1',
  additional_notes: 'Additional Notes 1',
  late_fee: 0.05,
  status: 1,
};

const LoanProductsPage = () => {
  const { http } = useAxios();
  const { notify } = MyToast();

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

      notify('info', 'Xóa sản phẩm vay thành công!');

      // Refresh data
      getList();
    } catch (error) {
      console.error(error);

      notify('error', 'Xóa sản phẩm vay thất bại!');
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
        const editPayload = {
          ...payload,
          ProductMethod: undefined,
          ProductType: undefined,
          createdAt: undefined,
          updatedAt: undefined,
          product_description: undefined,
          maximum_amount: Number(payload.maximum_amount),
          minimum_amount: Number(payload.minimum_amount),
        };

        await http.put(`${API_URL.LOAN_PRODUCT}`, editPayload);

        notify('info', 'Cập nhật sản phẩm vay thành công!');
      } else {
        await http.post(API_URL.LOAN_PRODUCT, payload);

        notify('info', 'Tạo mới sản phẩm vay thành công!');
      }

      // Refresh data
      getList();

      setIsOpenModalCreateEdit(false);
    } catch (error) {
      console.log(error);

      notify('error', 'Tạo mới sản phẩm vay thất bại!');
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
      title: 'Phương thức vay',
      dataIndex: ['ProductMethod', 'loan_method_name'],
      ellipsis: true,
    },
    {
      title: 'Mục đích vay',
      dataIndex: ['ProductType', 'loan_type_name'],
      ellipsis: true,
    },
    {
      title: 'Số tiền vay tối thiểu',
      dataIndex: 'minimum_amount',
      align: 'right',
      ellipsis: true,
      render: (value) => value.toLocaleString(),
    },
    {
      title: 'Số tiền vay tối đa',
      dataIndex: 'maximum_amount',
      align: 'right',
      ellipsis: true,
      render: (value) => value.toLocaleString(),
    },
    {
      title: 'Thời hạn vay tối thiểu',
      dataIndex: 'minimum_term',
      align: 'right',
      ellipsis: true,
    },
    {
      title: 'Thời hạn vay tối đa',
      dataIndex: 'maximum_term',
      align: 'right',
      ellipsis: true,
    },
    {
      title: 'Lịch trả nợ',
      dataIndex: 'repayment_schedule',
      ellipsis: true,
    },
    {
      title: 'Điều kiện vay',
      dataIndex: 'eligibility_criteria',
      ellipsis: true,
    },
    {
      title: 'Mô tả sản phẩm',
      dataIndex: 'product_description',
      ellipsis: true,
    },
    {
      title: 'Ghi chú',
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
      align: 'center',
      ellipsis: true,
      render: (value) => (
        <Tag color={value === '1' ? 'success' : 'error'}>
          {value === '1' ? 'Đang hoạt động' : 'Không hoạt động'}
        </Tag>
      ),
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

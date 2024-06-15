import HeadingWrapper from '@/components/HeadingWrapper';
import styles from './Index.module.scss';
import { Button, Col, Input, Row, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import useAxios from '@/utils/axios';
import ModalLoanApplicationCreateEdit from './ModalLoanApplicationCreateEdit';
import ModalConfirmDelete from '@/components/ModalConfirmDelete';
import API_URL from '@/constants/api-url';
import MyToast from '@mdrakibul8001/toastify';
import { convertISOToDDMMYYYY } from '@/utils/format-date';
import {
  getLoanApplicationStatusColor,
  getLoanApplicationStatusText,
} from '@/utils/common';

const { Search } = Input;

const defaultValues = {
  loan_product_id: 2,
  customer_id: 1,
  payment_date: '01/01/2024',
  loan_term: 1,
  principal_amount: 110000,
  remaining_balance: 110000,
};

const LoanApplicationsPage = () => {
  const { http } = useAxios();
  const { notify } = MyToast();

  const [isOpenModalCreateEdit, setIsOpenModalCreateEdit] = useState(false);
  const [isSpinningModalCreateEdit, setIsSpinningModalCreateEdit] =
    useState(false);
  const [isOpenModalConfirmDelete, setIsOpenModalConfirmDelete] =
    useState(false);
  const [isGettingList, setIsGettingList] = useState(false);
  const [loanApplications, setLoanApplications] = useState([]);
  const [initialValues, setInitialValues] = useState(defaultValues);
  const [deleteApplicationId, setDeleteApplicationId] = useState(null);
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

      await http.delete(`${API_URL.LOAN_APPLICATION}/${deleteApplicationId}`);

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
      const res = await http.get(API_URL.LOAN_APPLICATION);

      const metadata = res?.data?.metadata;

      if (metadata) {
        setLoanApplications(metadata);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsGettingList(false);
    }
  };

  const handleOkModalCreateEdit = async (payload) => {
    const formattedPayload = {
      ...payload,
      payment_status: Number(payload.payment_status),
    };

    try {
      setIsSpinningModalCreateEdit(true);

      const loanApplicationId = formattedPayload.payment_id;

      if (loanApplicationId) {
        const editPayload = {
          ...formattedPayload,
          payment_id: undefined,
          createdAt: undefined,
          updatedAt: undefined,
          principal_amount: Number(formattedPayload.principal_amount),
          remaining_balance: Number(formattedPayload.remaining_balance),
          amount_paid: Number(formattedPayload.amount_paid),
          next_term_fee: Number(formattedPayload.next_term_fee),
          loan_term: Number(formattedPayload.loan_term),
        };

        await http.put(
          `${API_URL.LOAN_APPLICATION}/${loanApplicationId}`,
          editPayload
        );

        notify('info', 'Cập nhật đơn vay thành công!');
      } else {
        await http.post(API_URL.LOAN_APPLICATION, payload);

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
    setDeleteApplicationId(record.payment_id);
    openModalDelete();
  };

  const columns = [
    {
      title: 'ID',
      align: 'center',
      dataIndex: 'payment_id',
      fixed: 'left',
      width: 80,
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'customer_name',
      ellipsis: true,
    },
    {
      title: 'Tên sản phẩm vay',
      dataIndex: 'loan_product_name',
      ellipsis: true,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'payment_status',
      ellipsis: true,
      render: (value) => {
        const color = getLoanApplicationStatusColor(value);
        const text = getLoanApplicationStatusText(value);

        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Số dư còn lại',
      dataIndex: 'remaining_balance',
      ellipsis: true,
    },
    {
      title: 'Số tiền đã trả',
      dataIndex: 'amount_paid',
      ellipsis: true,
    },
    {
      title: 'Số tiền phải trả cho kì hạn tiếp',
      dataIndex: 'next_term_fee',
      ellipsis: true,
      width: 250,
    },
    {
      title: 'Nợ gốc ban đầu',
      dataIndex: 'principal_amount',
      ellipsis: true,
    },
    {
      title: 'Kỳ hạn thanh toán',
      dataIndex: 'loan_term',
      ellipsis: true,
      width: 170,
    },
    {
      title: 'Hạn thanh toán',
      dataIndex: 'payment_date',
      ellipsis: true,
      width: 150,
      render: (value) => convertISOToDDMMYYYY(value),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      ellipsis: true,
      width: 150,
      render: (value) => convertISOToDDMMYYYY(value),
    },
    {
      title: 'Ngày cập nhập',
      dataIndex: 'updatedAt',
      ellipsis: true,
      width: 150,
      render: (value) => convertISOToDDMMYYYY(value),
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
      <HeadingWrapper title="Quản lý đơn vay" onClickCreate={openModalCreate} />

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
          dataSource={loanApplications}
          columns={columns}
          loading={isGettingList}
          pagination={loanApplications.length > 7 ? { pageSize: 7 } : false}
          scroll={{
            // x: scrollX || true,
            x: 2200,
          }}
          rowKey={(record) => record.payment_id}
        />
      </div>

      <>
        {isOpenModalCreateEdit && (
          <ModalLoanApplicationCreateEdit
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

export default LoanApplicationsPage;

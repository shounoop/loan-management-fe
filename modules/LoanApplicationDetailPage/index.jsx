import { useEffect } from 'react';
import styles from './Index.module.scss';
import useAxios from '@/utils/axios';
import API_URL from '@/constants/api-url';
import MyToast from '@mdrakibul8001/toastify';
import { useRouter } from 'next/router';
import { useState } from 'react';
import HeadingWrapper from '@/components/HeadingWrapper';
import { convertISOToDDMMYYYY } from '@/utils/format-date';
import {
  getLoanApplicationStatusText,
  getLoanApplicationStatusColor,
} from '@/utils/common';
import { Button, Col, Row, Tag, Table } from 'antd';
import ModalConfirmDelete from '@/components/ModalConfirmDelete';

const LoanApplicationDetailPage = () => {
  const { http } = useAxios();
  const { notify } = MyToast();

  const router = useRouter();

  const payment_id = router.query.id;

  const [loanApplication, setLoanApplication] = useState({});
  const [documents, setDocuments] = useState([]);
  const [isGettingList, setIsGettingList] = useState(false);
  const [isOpenModalConfirmDelete, setIsOpenModalConfirmDelete] =
    useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [clickedFilename, setClickedFilename] = useState();
  const [downloading, setDownloading] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    if (payment_id) {
      (async () => {
        try {
          const res = await http.get(
            `${API_URL.LOAN_APPLICATION}/${payment_id}`
          );

          const metadata = res?.data?.metadata;

          if (metadata) {
            setLoanApplication(metadata);
          }
        } catch (error) {
          console.error(error);
        }
      })();

      (async () => {
        try {
          setIsGettingList(true);
          const res = await http.get(`${API_URL.DOCUMENT}/all/${payment_id}`);

          const data = res?.data?.infor?.data;

          if (data) {
            setDocuments(data);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsGettingList(false);
        }
      })();
    }
  }, [payment_id]);

  const sendEmail = async () => {
    const payload = {
      full_name: loanApplication.customer_name,
      method_name: loanApplication.method_name,
      payment_date: loanApplication.payment_date,
      next_term_fee: loanApplication.next_term_fee,
      email: loanApplication.email,
    };

    try {
      setIsSendingEmail(true);
      await http.post(API_URL.SEND_EMAIL, payload);

      notify('info', 'Gửi email thành công');
    } catch (error) {
      console.error(error);

      notify('error', 'Gửi email thất bại');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const generatePDF = async () => {
    const payload = {
      full_name: 'Tran van tuan',
      identity_number: '012345678',
      address: '123 Đường ABC, Phường DEF, Quận GHI, Thành phố JKL',
      phone_number: '0901234567',
      email: 'nguyenvana@example.com',
      principal_amount: 50000000,
      loan_type_name: 'Vay mua nhà',
      loan_term: 12,
      loan_method_name: 'vay lãi suất giảm dần',
      interest_rate: 0.01,
    };

    try {
      setIsGeneratingPDF(true);

      const res = await http.post(API_URL.GENERATE_PDF, payload);

      console.log('res', res);
    } catch (error) {
      console.error(error);

      notify('error', 'Tạo PDF thất bại');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const downloadDocument = async (record) => {
    try {
      setDownloading(true);

      const res = await http.get(
        `${API_URL.DOCUMENT}/${record.document_path}`,
        {
          responseType: 'blob',
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', record.document_path);
      document.body.appendChild(link);
      link.click();

      notify('info', 'Tải về tài liệu thành công');
    } catch (error) {
      console.error(error);

      notify('error', 'Tải về tài liệu thất bại');
    } finally {
      setDownloading(false);
    }
  };

  const handleOkModalDelete = async () => {
    if (!payment_id || !clickedFilename) return;

    try {
      setIsDeleting(true);

      await http.delete(`${API_URL.DOCUMENT}/${payment_id}/${clickedFilename}`);

      notify('info', 'Xóa tài liệu thành công');

      setDocuments((prev) =>
        prev.filter((doc) => doc.document_path !== clickedFilename)
      );

      setIsOpenModalConfirmDelete(false);
    } catch (error) {
      console.error(error);

      notify('error', 'Xóa tài liệu thất bại');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelModalDelete = () => {
    setIsOpenModalConfirmDelete(false);
  };

  const onClickDelete = (record) => {
    setIsOpenModalConfirmDelete(true);
    setClickedFilename(record.document_path);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'document_id',
      width: 100,
    },
    {
      title: 'Tài liệu',
      dataIndex: 'document_path',
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'center',
      fixed: 'right',
      width: 160,
      render: (_, record) => (
        <Row align="middle" wrap={false} gutter={8}>
          <Col>
            <Button
              type="primary"
              onClick={() => downloadDocument(record)}
              loading={downloading}
              disabled={downloading}
            >
              Tải về
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
        titleSpan={24}
        title={
          <Row
            style={{ width: '100%' }}
            align={'middle'}
            justify={'space-between'}
          >
            <Col>
              <Row gutter={16} align={'middle'} justify={'space-between'}>
                <Col
                  style={{
                    fontSize: '24px',
                    fontWeight: 600,
                    lineHeight: '32px',
                    color: '#1a1d1f',
                  }}
                >
                  Chi tiết đơn vay
                </Col>

                <Col>
                  <Tag
                    color={getLoanApplicationStatusColor(
                      loanApplication.payment_status
                    )}
                  >
                    {getLoanApplicationStatusText(
                      loanApplication.payment_status
                    )}
                  </Tag>
                </Col>
              </Row>
            </Col>

            <Col>
              <Row gutter={16}>
                <Col>
                  <Button
                    onClick={sendEmail}
                    loading={isSendingEmail}
                    disabled={isSendingEmail}
                  >
                    Gửi email
                  </Button>
                </Col>

                <Col>
                  <Button
                    onClick={generatePDF}
                    type="primary"
                    loading={isGeneratingPDF}
                    disabled={isGeneratingPDF}
                  >
                    Tạo PDF
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        }
      />

      <div className={styles.content}>
        <div className={styles.row}>
          <Row>
            <Col span={12}>
              <p>
                <strong>Khách hàng:</strong> {loanApplication.customer_name}
              </p>
            </Col>

            <Col span={12}>
              <p>
                <strong>Sản phẩm vay:</strong>{' '}
                {loanApplication.loan_product_name}
              </p>
            </Col>

            <Col span={12}>
              <p>
                <strong>Hạn thanh toán:</strong>{' '}
                {convertISOToDDMMYYYY(loanApplication.payment_date)}
              </p>
            </Col>

            <Col span={12}>
              <p>
                <strong>Kỳ hạn thanh toán:</strong>{' '}
                {`${loanApplication.loan_term} tháng`}
              </p>
            </Col>

            <Col span={12}>
              <p>
                <strong>Nợ gốc ban đầu:</strong>{' '}
                {loanApplication.principal_amount}
              </p>
            </Col>

            <Col span={12}>
              <p>
                <strong>Số tiền phải trả cho kì hạn tiếp:</strong>{' '}
                {loanApplication.next_term_fee}
              </p>
            </Col>

            <Col span={12}>
              <p>
                <strong>Số tiền đã trả:</strong> {loanApplication.amount_paid}
              </p>
            </Col>

            <Col span={12}>
              <p>
                <strong>Số dư còn lại:</strong>{' '}
                {loanApplication.remaining_balance}
              </p>
            </Col>
          </Row>
        </div>

        <div className={styles.documentWrapper}>
          <HeadingWrapper
            title={'Danh sách tài liệu'}
            onClickCreate={() => {
              console.log('create document');
            }}
          />

          <div className={styles.table_wrapper}>
            <Table
              dataSource={documents}
              columns={columns}
              loading={isGettingList}
              pagination={documents.length > 7 ? { pageSize: 7 } : false}
              rowKey={(record) => record.document_id}
            />
          </div>
        </div>
      </div>

      <>
        {isOpenModalConfirmDelete && (
          <ModalConfirmDelete
            open={isOpenModalConfirmDelete}
            title="Xác Nhận Xoá"
            handleOkModalDelete={handleOkModalDelete}
            handleCancelModalDelete={handleCancelModalDelete}
            content="Bạn có chắc chắn muốn xóa tài liệu này?"
            isDeleting={isDeleting}
          />
        )}
      </>
    </div>
  );
};

export default LoanApplicationDetailPage;

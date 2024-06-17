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
import { Button, Col, Row, Tag } from 'antd';

const LoanApplicationDetailPage = () => {
  const { http } = useAxios();
  const { notify } = MyToast();

  const router = useRouter();

  const payment_id = router.query.id;

  const [loanApplication, setLoanApplication] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const res = await http.get(`${API_URL.LOAN_APPLICATION}/${payment_id}`);

        const metadata = res?.data?.metadata;

        if (metadata) {
          setLoanApplication(metadata);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [payment_id]);

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
              {/* button: send email, create pdf */}
              <Row gutter={16}>
                <Col>
                  <Button>Gửi email</Button>
                </Col>

                <Col>
                  <Button type="primary">Tạo PDF</Button>
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

        {/* below is document list */}
        <div className={styles.documentWrapper}>
          <HeadingWrapper
            title={'Danh sách tài liệu'}
            onClickCreate={() => {
              console.log('create document');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoanApplicationDetailPage;

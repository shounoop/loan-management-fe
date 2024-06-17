import { Row, Col, Button } from 'antd';
import styles from './Index.module.scss';

const HeadingWrapper = (props) => {
  const { title, onClickCreate = false, titleSpan = 'unset' } = props;

  return (
    <div className={styles.wrapper}>
      <Row justify="space-between" align="middle">
        <Col span={titleSpan} className={styles.heading_title}>
          {title}
        </Col>

        {onClickCreate && (
          <Col>
            <Button type="primary" size="middle" onClick={onClickCreate}>
              Thêm mới
            </Button>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default HeadingWrapper;

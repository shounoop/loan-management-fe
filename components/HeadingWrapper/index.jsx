import { Row, Col, Button } from 'antd';
import styles from './Index.module.scss';

const HeadingWrapper = (props) => {
  const { title, onClickAddNew } = props;

  return (
    <div className={styles.wrapper}>
      <Row justify="space-between" align="middle">
        <Col className={styles.heading_title}>{title}</Col>

        <Col>
          <Button type="primary" size="middle" onClick={onClickAddNew}>
            Thêm mới
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default HeadingWrapper;

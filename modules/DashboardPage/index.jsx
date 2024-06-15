import useAxios from '@/utils/axios';
import styles from './Index.module.scss';
import { Button } from 'antd';

const DashboardPage = () => {
  const { http } = useAxios();

  const onClick = async () => {
    try {
      const res = await http.get('/api/test/user');

      console.log('res', res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>Dashboard</h1>

      <Button type="primary" onClick={onClick}>
        Click me to test API
      </Button>
    </div>
  );
};

export default DashboardPage;

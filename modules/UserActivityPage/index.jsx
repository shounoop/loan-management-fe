import styles from './Index.module.scss';
import HeadingWrapper from '@/components/HeadingWrapper';
import { Button, Col, Input, Row, Table } from 'antd';
import { useEffect, useState } from 'react';
import useAxios from '@/utils/axios';
import API_URL from '@/constants/api-url';
import MyToast from '@mdrakibul8001/toastify';

const UserActivityPage = () => {
  const { http } = useAxios();

  const [isGettingList, setIsGettingList] = useState(false);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      setIsGettingList(true);
      const res = await http.get(API_URL.USER_ACTIVITY);

      const data = res?.data;

      if (data) {
        setActivities(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsGettingList(false);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Hoạt động',
      dataIndex: 'activityDescription',
    },
    {
      title: 'Thời gian',
      dataIndex: 'timestamp',
    },
  ];

  return (
    <div className={styles.wrapper}>
      <HeadingWrapper title="Hoạt động người dùng" />

      <div className={styles.table_wrapper}>
        <Table
          dataSource={activities}
          columns={columns}
          loading={isGettingList}
          pagination={activities.length > 9 ? { pageSize: 9 } : false}
          rowKey={(record) => record.id}
        />
      </div>
    </div>
  );
};

export default UserActivityPage;

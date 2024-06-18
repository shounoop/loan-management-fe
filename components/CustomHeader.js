import React from 'react';
import { Button, Space } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import { deleteAllCookies } from '@/utils/cookie-storage';
import MyToast from '@mdrakibul8001/toastify';

const CustomHeader = ({ collapsed, onToggleCollapse }) => {
  const { notify } = MyToast();
  const router = useRouter();

  const [isSpinning, setIsSpinning] = React.useState(false);

  const onLogout = async () => {
    try {
      setIsSpinning(true);

      await http.get(API_URL.LOGOUT);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSpinning(false);
      localStorage.clear();
      deleteAllCookies();

      await router.push('/');

      router.reload();
      notify('info', 'Đăng xuất thành công!');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        zIndex: 1,
      }}
    >
      <Space>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggleCollapse}
          style={{ fontSize: '16px', width: 64, height: 64 }}
        />
      </Space>

      <Space>
        <Button
          type="text"
          icon={<LogoutOutlined />}
          onClick={onLogout}
          style={{ fontSize: '16px', height: 64 }}
          loading={isSpinning}
        >
          Đăng xuất
        </Button>
      </Space>
    </div>
  );
};

export default CustomHeader;

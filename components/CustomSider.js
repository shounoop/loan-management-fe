import React from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  BlockOutlined,
  AimOutlined,
  IdcardOutlined,
  FileProtectOutlined,
  UserOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';

const MenuKeys = {
  DASHBOARD: 'dashboard',
  LOAN_METHODS: 'loan-methods',
  LOAN_TYPES: 'loan-types',
  LOAN_APPLICATIONS: 'loan-applications',
  LOAN_PRODUCTS: 'loan-products',
  CUSTOMERS: 'customers',
  PRODUCTS: 'products',
  USERS: 'users',
  ACTIVITIES: 'activities',
};

const CustomSider = () => {
  const router = useRouter();

  const menuItems = [
    {
      key: MenuKeys.DASHBOARD,
      icon: <HomeOutlined />,
      label: 'Trang Chủ',
      path: '/',
    },
    {
      key: MenuKeys.LOAN_METHODS,
      icon: <BlockOutlined />,
      label: 'Phương Thức Vay',
      path: '/loan-methods',
    },
    {
      key: MenuKeys.LOAN_TYPES,
      icon: <AimOutlined />,
      label: 'Mục Đích Vay',
      path: '/loan-types',
    },
    {
      key: MenuKeys.LOAN_PRODUCTS,
      icon: <FileProtectOutlined />,
      label: 'Sản Phẩm Vay',
      path: '/loan-products',
    },
    {
      key: MenuKeys.CUSTOMERS,
      icon: <UserOutlined />,
      label: 'Khách Hàng',
      path: '/customers',
    },
    {
      key: MenuKeys.LOAN_APPLICATIONS,
      icon: <IdcardOutlined />,
      label: 'Đơn Vay',
      path: '/loan-applications',
    },
    {
      key: MenuKeys.USERS,
      icon: <UserOutlined />,
      label: 'Người dùng',
      path: '/users',
    },
    {
      key: MenuKeys.ACTIVITIES,
      icon: <NotificationOutlined />,
      label: 'Hoạt động',
      path: '/user-activity',
    },
  ];

  const renderMenuItem = (item) => {
    if (item.children) {
      return (
        <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
          {item.children.map((child) => renderMenuItem(child))}
        </Menu.SubMenu>
      );
    }

    return (
      <Menu.Item
        key={item.key}
        icon={item.icon}
        onClick={() => handleMenuClick(item.path)}
      >
        {item.label}
      </Menu.Item>
    );
  };

  const handleMenuClick = (path) => {
    router.push(path);
  };

  return (
    <div>
      <div className="demo-logo-vertical" />

      <Menu
        theme="light"
        defaultSelectedKeys={[MenuKeys.DASHBOARD]}
        mode="inline"
      >
        {menuItems.map((item) => renderMenuItem(item))}
      </Menu>
    </div>
  );
};

export default CustomSider;

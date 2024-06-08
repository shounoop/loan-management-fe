import React from 'react';
import { Menu } from 'antd';
import { GlobalOutlined, MenuOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const MenuKeys = {
  DASHBOARD: 'dashboard',
  LOAN_METHODS: 'loan-methods',
  LOAN_TYPES: 'loan-types',
  LOAN_APPLICATIONS: 'loan-applications',
  LOAN_PRODUCTS: 'loan-products',
  CUSTOMERS: 'customers',
  PRODUCTS: 'products',
};

const CustomSider = () => {
  const router = useRouter();

  const menuItems = [
    {
      key: MenuKeys.DASHBOARD,
      icon: <GlobalOutlined />,
      label: 'Dashboard',
      path: '/',
    },
    {
      key: MenuKeys.LOAN_METHODS,
      icon: <GlobalOutlined />,
      label: 'Loan Methods',
      path: '/loan-methods',
    },
    {
      key: MenuKeys.LOAN_TYPES,
      icon: <GlobalOutlined />,
      label: 'Loan Types',
      path: '/loan-types',
    },
    {
      key: MenuKeys.LOAN_APPLICATIONS,
      icon: <GlobalOutlined />,
      label: 'Loan Applications',
      path: '/loan-applications',
    },
    {
      key: MenuKeys.LOAN_PRODUCTS,
      icon: <GlobalOutlined />,
      label: 'Loan Products',
      path: '/loan-products',
    },
    {
      key: MenuKeys.CUSTOMERS,
      icon: <GlobalOutlined />,
      label: 'Customer',
      path: '/customers',
    },
    {
      icon: <MenuOutlined />,
      key: MenuKeys.PRODUCTS,
      label: 'Products',
      path: '/products',
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

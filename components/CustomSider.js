import React from 'react';
import { Menu } from 'antd';
import { GlobalOutlined, MenuOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const CustomSider = () => {
	const router = useRouter();

	const menuItems = [
		{
			key: 'home',
			icon: <GlobalOutlined />,
			label: 'Home',
			path: '/',
		},
		{
			icon: <MenuOutlined />,
			key: 'products',
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

			<Menu theme="light" defaultSelectedKeys={['home']} mode="inline">
				{menuItems.map((item) => renderMenuItem(item))}
			</Menu>
		</div>
	);
};

export default CustomSider;

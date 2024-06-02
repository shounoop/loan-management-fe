import React from 'react';
import { Menu } from 'antd';
import {
	GlobalOutlined,
	DashboardOutlined,
	MenuOutlined,
	ContainerOutlined,
	UsergroupAddOutlined,
	AuditOutlined,
	UserOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';

const CustomSider = ({ collapsed, onToggleCollapse }) => {
	const router = useRouter();

	const menuItems = [
		{
			key: 'profile',
			icon: <GlobalOutlined />,
			label: 'Profile',
			path: '/profile',
		},

		{
			key: 'masterdata',
			icon: <MenuOutlined />,
			label: 'Master Data',
			children: [{ key: 'products', label: 'Products', path: '/products' }],
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

			<Menu theme="dark" defaultSelectedKeys={['profile']} mode="inline">
				{menuItems.map((item) => renderMenuItem(item))}
			</Menu>
		</div>
	);
};

export default CustomSider;

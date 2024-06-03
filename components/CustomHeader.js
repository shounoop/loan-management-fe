import React from 'react';
import { Button, Space } from 'antd';
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	LogoutOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';

const CustomHeader = ({ collapsed, onToggleCollapse }) => {
	const router = useRouter();

	const onLogout = async () => {
		localStorage.clear();
		await router.replace('/');
		await router.reload();
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
					onClick={async () => {
						await onLogout();
					}}
					style={{ fontSize: '16px', height: 64 }}
				>
					Logout
				</Button>
			</Space>
		</div>
	);
};

export default CustomHeader;

import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import CustomSider from './CustomSider';
import CustomHeader from './CustomHeader';
import Footer from './Footer';

const { Sider, Content } = Layout;

const MainLayout = ({ children }) => {
	const [collapsed, setCollapsed] = useState(false);

	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider trigger={null} collapsible collapsed={collapsed} width={200}>
				<CustomSider collapsed={collapsed} />
			</Sider>

			<Layout>
				<CustomHeader
					collapsed={collapsed}
					onToggleCollapse={() => setCollapsed(!collapsed)}
				/>

				<Content>{children}</Content>

				<Footer />
			</Layout>
		</Layout>
	);
};

export default MainLayout;

import React, { useState } from 'react';
import { Button, Checkbox, Form, Grid, Input, theme, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import useAxios from '../utils/axios';
import MyToast from '@mdrakibul8001/toastify';
import { useRouter } from 'next/router';

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

const Login = () => {
	const { notify } = MyToast();

	const router = useRouter();

	const { http, saveToken } = useAxios();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const { token } = useToken();
	const screens = useBreakpoint();

	const onFinish = async () => {
		notify('info', 'Checking...!');

		await http
			.post(`/api/auth/login`, {
				username,
				password,
			})
			.then((res) => {
				const userHere = res.data;

				saveToken(userHere, null);

				console.log('Authorization', res.headers.get('Authorization'));
				console.log('res', res);
				// router.reload();
			})
			.catch((e) => {
				const msg = e.response?.data;

				if (typeof msg === 'string') {
					notify('error', `${e.response.data}`);
				} else {
					if (msg?.email) {
						notify('error', `${msg.email.Email}`);
					}
				}
			});
	};

	const styles = {
		container: {
			margin: '0 auto',
			padding: screens.md
				? `${token.paddingXL}px`
				: `${token.sizeXXL}px ${token.padding}px`,
			width: '380px',
		},
		footer: {
			marginTop: token.marginLG,
			textAlign: 'center',
			width: '100%',
		},
		forgotPassword: {
			float: 'right',
		},
		header: {
			marginBottom: token.marginXL,
		},
		section: {
			alignItems: 'center',
			backgroundColor: token.colorBgContainer,
			display: 'flex',
			height: screens.sm ? '100vh' : 'auto',
			padding: screens.md ? `${token.sizeXXL}px 0px` : '0px',
		},
		text: { color: token.colorTextSecondary },
		title: {
			fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
		},
	};

	return (
		<section style={styles.section}>
			<div style={styles.container}>
				<div style={styles.header}>
					<Title style={styles.title}>Sign in</Title>

					<Text style={styles.text}>
						Welcome back to AntBlocks UI! Please enter your details below to
						sign in.
					</Text>
				</div>

				<Form
					name="normal_login"
					initialValues={{ remember: true }}
					onFinish={onFinish}
					layout="vertical"
					requiredMark="optional"
				>
					<Form.Item
						name="username"
						rules={[
							{
								required: true,
								message: 'Please input your username!',
							},
						]}
					>
						<Input
							prefix={<UserOutlined />}
							placeholder="Username"
							onChange={(e) => setUsername(e.target.value)}
						/>
					</Form.Item>

					{/* <Form.Item
						name="email"
						rules={[
							{
								type: 'email',
								required: true,
								message: 'Please input your Email!',
							},
						]}
					>
						<Input
							prefix={<MailOutlined />}
							placeholder="Email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Item> */}

					<Form.Item
						name="password"
						rules={[{ required: true, message: 'Please input your Password!' }]}
					>
						<Input.Password
							prefix={<LockOutlined />}
							type="password"
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Item>

					<Form.Item>
						<Form.Item name="remember" valuePropName="checked" noStyle>
							<Checkbox>Remember me</Checkbox>
						</Form.Item>

						<a style={styles.forgotPassword} href="">
							Forgot password?
						</a>
					</Form.Item>

					<Form.Item style={{ marginBottom: '0px' }}>
						<Button block="true" type="primary" htmlType="submit">
							Log in
						</Button>

						<div style={styles.footer}>
							<Text style={styles.text}>Dont have an account?</Text>{' '}
							<Link href="">Sign up now</Link>
						</div>
					</Form.Item>
				</Form>
			</div>
		</section>
	);
};

export default Login;

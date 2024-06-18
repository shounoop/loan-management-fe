import React, { useState } from 'react';
import { Button, Checkbox, Form, Grid, Input, theme, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import useAxios from '../utils/axios';
import MyToast from '@mdrakibul8001/toastify';
import { useRouter } from 'next/router';
import { getCookie } from '../utils/cookie-storage';
import API_URL from '../constants/api-url';

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;

const Login = () => {
  const { notify } = MyToast();

  const router = useRouter();

  const { http, saveToken } = useAxios();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { token: themeToken } = useToken();
  const screens = useBreakpoint();

  const onFinish = async () => {
    await http
      .post(API_URL.LOGIN, { username, password })
      .then((res) => {
        const userHere = res.data;

        // to get token from cookie --> set httpOnly: false in backend
        // jwtToken is empty string if httpOnly: true
        const jwtToken = getCookie(process.env.NEXT_PUBLIC_JWT_COOKIE_NAME);

        saveToken(userHere, jwtToken);

        router.reload();

        notify('success', 'Đăng nhập thành công!');
      })
      .catch((e) => {
        notify('error', 'Thông tin đăng nhập không chính xác!');
      });
  };

  const styles = {
    container: {
      margin: '0 auto',
      padding: screens.md
        ? `${themeToken.paddingXL}px`
        : `${themeToken.sizeXXL}px ${themeToken.padding}px`,
      width: '380px',
    },
    footer: {
      marginTop: themeToken.marginLG,
      textAlign: 'center',
      width: '100%',
    },
    forgotPassword: {
      float: 'right',
    },
    header: {
      marginBottom: themeToken.marginXL,
    },
    section: {
      alignItems: 'center',
      backgroundColor: themeToken.colorBgContainer,
      display: 'flex',
      height: screens.sm ? '100vh' : 'auto',
      padding: screens.md ? `${themeToken.sizeXXL}px 0px` : '0px',
    },
    text: { color: themeToken.colorTextSecondary },
    title: {
      fontSize: screens.md
        ? themeToken.fontSizeHeading2
        : themeToken.fontSizeHeading3,
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <Title style={styles.title}>Đăng nhập</Title>

          <Text style={styles.text}>
            {/* Welcome back to AntBlocks UI! Please enter your details below to
            sign in. */}
            Chào mừng bạn trở lại! Vui lòng nhập thông tin của bạn bên dưới để
            đăng nhập.
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
                message: 'Vui lòng nhập tên đăng nhập!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Tên đăng nhập"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Ghi nhớ</Checkbox>
            </Form.Item>

            <a style={styles.forgotPassword} href="">
              Quên mật khẩu?
            </a>
          </Form.Item>

          <Form.Item style={{ marginBottom: '0px' }}>
            <Button block="true" type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default Login;

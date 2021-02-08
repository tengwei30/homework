// import { useState , useEffect } from 'react'
import { Form, Input, Button, message } from 'antd';
import { MobileOutlined, LockOutlined } from '@ant-design/icons';
import { LogIn } from '../services/login'

const Login = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    const { phone, password } = values
    LogIn(phone, password).then(res => {
      message.success('登录成功～')
    })
  };
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}>
      <Form.Item
        name="phone"
        rules={[
          {
            required: true,
            message: '请输入你的手机号!',
          },
        ]}>
        <Input prefix={<MobileOutlined className="site-form-item-icon" />} placeholder="请输入你的手机号" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}>
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;

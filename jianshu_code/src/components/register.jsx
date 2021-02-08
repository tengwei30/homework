
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, MobileOutlined, LockOutlined } from '@ant-design/icons';
import { Register } from '../services/login'

const register = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    const { phone, password, name } = values
    Register(name,phone, password).then(res => {
      message.success('注册成功')
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
        name="name"
        rules={[
          {
            required: true,
            message: '请输入你的昵称!',
          },
        ]}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入你的昵称" />
      </Form.Item>
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
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default register;

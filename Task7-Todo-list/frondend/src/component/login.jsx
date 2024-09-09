import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, notification } from 'antd'; // Import notification
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import image from '../assets/lg-removebg-preview.png';

function Login({ setUser }) {
  const navigate = useNavigate(); // Create navigate function

  const onFinish = async (values) => {
    const { username, password } = values;

    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });
      console.log(response.data); // Handle success (e.g., redirect or show a message)

      // Call the function to set user info
      setUser(response.data.id);
      navigate('/Todo'); // Navigate to the Todo page
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      
      // Display an error notification for invalid login
      notification.error({
        message: 'Login Failed',
        description: error.response?.data?.error || 'Invalid username or password. Please try again.',
      });
    }
  };

  return (
    <>
      <div>
        <nav style={{ padding: '10px', marginBottom: '20px', backgroundColor: "rgb(239, 225, 224)", display: 'flex', justifyContent: 'space-between' }}>
          <img style={{ width: "100px", height: "100px" }} src={image} alt="Logo" />
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex' }}>
            <li style={{ marginRight: '20px' }}>
              <Link to={'/Landingpage'} style={{ textDecoration: 'none', color: '#333' }}>Home</Link>
            </li>
            <li style={{ marginRight: '20px' }}>
              <Link to={'/Register'} style={{ textDecoration: 'none', color: '#333' }}>Register</Link>
            </li>
            <li style={{ marginRight: '20px' }}>
              <Link to={'/Contact'} style={{ textDecoration: 'none', color: '#333' }}>Contact</Link>
            </li>
            <li style={{ marginRight: '20px' }}>
              <Link to={'/Todo'} style={{ textDecoration: 'none', color: '#333' }}>Todo</Link>
            </li>
          </ul>
        </nav>
        <div style={{ padding: '20px', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '20px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', width: "500px" }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '100%', position: 'relative' }}>
                <div style={{ backgroundColor: '#e0e0f4', height: '200px', width: '100%', borderRadius: '10px', position: 'absolute', top: '-10px', zIndex: '-1' }} />
                <div style={{ backgroundColor: '#d9d9f7', height: '200px', width: '100%', borderRadius: '10px', position: 'absolute', top: '-5px', zIndex: '-2' }} />
              </div>

              <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <a className="login-form-forgot" href="">
                    Forgot password
                  </a>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                  </Button>
                  Or <Link to="/Register">register now!</Link>
                </Form.Item>
              </Form>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <a href="#" style={{ marginRight: '10px', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                  <i className="fa fa-instagram" aria-hidden="true" style={{ fontSize: '20px', color: '#2196F3' }} />
                </a>
                <a href="#" style={{ marginRight: '10px', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                  <i className="fa fa-facebook" aria-hidden="true" style={{ fontSize: '20px', color: '#3b5998' }} />
                </a>
                <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                  <i className="fa fa-twitter" aria-hidden="true" style={{ fontSize: '20px', color: '#1da1f2' }} />
                </a>
              </div>
            </div>
          </div>
          <footer style={{ backgroundColor: 'rgb(239, 225, 224)', color: '#fff', padding: '20px', marginTop: '20px', textAlign: 'center' }}>
            <p>&copy;Task7 Todo List Sanele Mkhize.</p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Login;

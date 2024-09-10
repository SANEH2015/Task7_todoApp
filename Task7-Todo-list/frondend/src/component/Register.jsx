import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import image from '../assets/lg-removebg-preview.png';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
  
    // Basic validation
    if (!name || !phoneNumber || !username || !password) {
      setError('Please fill in all fields');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3001/register', {
        name,
        phoneNumber,
        username,
        password,
      });
  
      console.log('API Response:', response);
  
      // Check if status code is 200
      if (response.status === 201) {
        setSuccess(response.data.message);
        navigate('/login');
      } else {
        setError(response.data.error );
      }
    } catch (error) {
      console.error('API Error:', error);
  
      if (error.response) {
        setError(error.response.data.error || 'An error occurred');
      } else if (error.request) {
        setError('No response from server');
      } else {
        setError('An error occurred');
      }
    }
  };

  return (
    <>
      <div>
        <nav style={{ padding: '10px', marginBottom: '20px', backgroundColor: "rgb(239, 225, 224)", display: 'flex', justifyContent: 'space-between' }}>
          <img style={{ width: "100px", height: "100px" }} src={image} alt="logo" />
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex' }}>
            <li style={{ marginRight: '20px' }}>
              <Link to={'/Landingpage'} style={{ textDecoration: 'none', color: '#333' }}> Home</Link>
            </li>
            <li style={{ marginRight: '20px' }}>
              <Link to={'/login'} style={{ textDecoration: 'none', color: '#333' }}>Login</Link>
            </li>
            <li style={{ marginRight: '20px' }}>
              <Link to={'/Contact'} style={{ textDecoration: 'none', color: '#333' }}> Contact</Link>
            </li>
          </ul>
        </nav>
        <div style={{ padding: '20px', minHeight: '100vh', justifyContent: "center" }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '20px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', width: "500px", marginLeft: "auto", marginRight: "auto" }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '100%', position: 'relative' }}>
                <div style={{ backgroundColor: '#e0e0f4', height: '200px', width: '100%', borderRadius: '10px', position: 'absolute', top: '-10px', zIndex: '-1' }} />
                <div style={{ backgroundColor: '#d9d9f7', height: '200px', width: '100%', borderRadius: '10px', position: 'absolute', top: '-5px', zIndex: '-2' }} />
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Register</h2>
                <h6>Please put your own information to register</h6>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', width: '100%', maxWidth: '300px' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <input type="text" placeholder="Phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', width: '100%', maxWidth: '300px' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <input type="text" placeholder="User name / Email" value={username} onChange={(e) => setUsername(e.target.value)} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', width: '100%', maxWidth: '300px' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', width: '100%', maxWidth: '300px' }} />
                </div>
                <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Register</button>
              </form>
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

export default Register;

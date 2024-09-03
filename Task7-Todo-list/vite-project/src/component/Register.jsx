import React from 'react';
import { Link } from "react-router-dom";
import image from '../assets/lg-removebg-preview.png'


function Register() {
  return (
    <>
    <div>
    <nav style={{  padding: '10px', marginBottom: '20px', backgroundColor:"rgb(239, 225, 224)", display: 'flex', justifyContent: 'space-between' }}>
        <img style={{width:"100px",height:"100px"}} src={image}></img>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex' }}>
          <li style={{ marginRight: '20px' }}>
           <Link to={'/Landingpage'} ><a  style={{ textDecoration: 'none', color: '#333' }}>Home</a></Link> 
          </li>
          <li style={{ marginRight: '20px' }}>
          <Link to={'/login'} > <a style={{ textDecoration: 'none', color: '#333' }}>Login</a></Link> 
          </li>
          <li style={{ marginRight: '20px' }}>
          <Link to={'/Contact'} > <a style={{ textDecoration: 'none', color: '#333' }}>Contact</a></Link> 
          </li>
        </ul>
      </nav>
      <div style={{  padding: '20px', minHeight: '100vh',justifyContent:"center" }}>
      <div style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '20px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',width:"500px",marginLeft:"500px" }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '100%', position: 'relative' }}>
            <div style={{ backgroundColor: '#e0e0f4', height: '200px', width: '100%', borderRadius: '10px', position: 'absolute', top: '-10px', zIndex: '-1' }} />
            <div style={{ backgroundColor: '#d9d9f7', height: '200px', width: '100%', borderRadius: '10px', position: 'absolute', top: '-5px', zIndex: '-2' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Register</h2>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ marginRight: '5px' }}>👤</span>
              <input type="text" placeholder="User name / Email" style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', width: '100%', maxWidth: '300px' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ marginRight: '5px' }}>🔒</span>
              <input type="password" placeholder="Password" style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', width: '100%', maxWidth: '300px' }} />
            </div>
            <button style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Register</button>
          </div>

         
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
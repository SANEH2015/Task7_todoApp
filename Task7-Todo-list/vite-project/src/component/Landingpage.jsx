import React from 'react'
import Image from '../assets/list.jpg'
import { Link } from "react-router-dom";
// import logo from "../assets/planelogo-removebg-preview.png"
import image from '../assets/lg-removebg-preview.png'

export default function Landingpage() {
  return (
    <div style={{  padding: '20px' }}>
      <nav style={{  padding: '10px', marginBottom: '20px', backgroundColor:"rgb(239, 225, 224)", display: 'flex', justifyContent: 'space-between' }}>
        <img style={{width:"100px",height:"100px"}} src={image}></img>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex' }}>
          <li style={{ marginRight: '20px' }}>
           <Link to={'/login'} ><a  style={{ textDecoration: 'none', color: '#333' }}>Login</a></Link> 
          </li>
          <li style={{ marginRight: '20px' }}>
          <Link to={'/Register'} > <a style={{ textDecoration: 'none', color: '#333' }}>Register</a></Link> 
          </li>
        </ul>
      </nav>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '40%', padding: '20px', margin: '0 auto' }}>
          <img
            src={Image}
           
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
        <div style={{ width: '50%', padding: '20px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '40px', marginBottom: '10px' }}>Welcome</h1>
          <h2 style={{ fontSize: '2em', marginBottom: '20px' }}>We're so glad you're here!</h2>
          <p style={{ fontSize: '30px' }}>
            We help you organize your time<br></br>To-Do App is simple and<br></br> awesome App to organise<br></br>your task with very easy
          </p>
        </div>
      </div>
      <footer style={{ backgroundColor: 'rgb(239, 225, 224)', color: '#fff', padding: '20px', marginTop: '20px', textAlign: 'center' }}>
        <p>&copy;Task7 Todo List Sanele Mkhize.</p>
      </footer>
    </div>
  );
}
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Landingpage from './component/Landingpage'
import Login from './component/login'
import Home from './component/Home'
import About from './component/About'
import Contact from './component/Contact'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nopage from './component/Nopage'

import Register from './component/Register'
import Layout from './component/Layout'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route index element={<Landingpage/>}/>
          <Route path="login" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path="Home" element={<Home />} />
          <Route path="About" element={<About />} />
          <Route path="Contact" element={<Contact />} />
          <Route path="*" element={<Nopage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App


import { Link } from "react-router-dom";
import image from '../assets/lg-removebg-preview.png'
import React, { useState } from 'react';


function Todo() {
  
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
  
    const handleAddTodo = () => {
      if (newTodo.trim() !== '') {
        setTodos([...todos, newTodo]);
        setNewTodo('');
      }
    };
  
    const handleDeleteTodo 
   = (index) => {
      const updatedTodos = [...todos];
      updatedTodos.splice(index, 1);
      setTodos(updatedTodos);
    };
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
          <Link to={'/Register'} > <a style={{ textDecoration: 'none', color: '#333' }}>Register</a></Link> 
          </li>
          <li style={{ marginRight: '20px' }}>
          <Link to={'/Contact'} > <a style={{ textDecoration: 'none', color: '#333' }}>Contact</a></Link> 
          </li>
        </ul>
      </nav>
      <div style={{  padding: '20px', justifyContent:"center" }}>
      <div style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '20px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',width:"500px",marginLeft:"500px" }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '100%', position: 'relative' }}>
            <div style={{ backgroundColor: '#e0e0f4', height: '200px', width: '100%', borderRadius: '10px', position: 'absolute', top: '-10px', zIndex: '-1' }} />
            <div style={{ backgroundColor: '#d9d9f7', height: '200px', width: '100%', borderRadius: '10px', position: 'absolute', top: '-5px', zIndex: '-2' }} />
          </div>

          <div>
        
        <div style={{ padding: '20px',  justifyContent: "center" }}>
          <div >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <h1 style={{ textAlign: 'center' }}>Todo list</h1>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <input
                  type="text"
                  placeholder="Enter a new todo"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                />
                <button style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={handleAddTodo}>Add Todo</button>
              </div>

              <ul style={{ listStyle: 'none', padding: 0 }}>
                {todos.map((todo, index) => (
                  <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ccc' }}>
                    {todo}
                    <button style={{ padding: '5px 10px', backgroundColor: '#ff4500', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleDeleteTodo(index)}>Delete</button>
                  </li>
                ))}
              </ul>

           
            </div>
          </div>
          
        </div>
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

export default Todo;

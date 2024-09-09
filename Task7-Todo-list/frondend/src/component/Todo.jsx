import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image from '../assets/lg-removebg-preview.png';

function Todo({ userid }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium' });
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/todo')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleAddTask = (event) => {
    event.preventDefault(); // Prevent form submission
    axios.post('http://localhost:3001/todo', newTask)
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTask({ title: '', description: '', priority: 'medium' });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleUpdateTask = (task) => {
    axios.put(`http://localhost:3001/todo/${task.id}`, task)
      .then(response => {
        setTasks(tasks.map(t => t.id === task.id ? task : t));
        setEditingTask(null);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDeleteTask = (taskId) => {
    axios.delete(`http://localhost:3001/todo/${taskId}`)
      .then(response => {
        setTasks(tasks.filter(t => t.id !== taskId));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handlePriorityChange = (event) => {
    setNewTask({ ...newTask, priority: event.target.value });
  };

  const handleEditTaskChange = (event, field) => {
    setEditingTask({ ...editingTask, [field]: event.target.value });
  };

  return (
    <>
      <div>
        <nav style={{
          padding: '10px',
          marginBottom: '20px',
          backgroundColor: "rgb(239, 225, 224)",
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap'
        }}>
          <img style={{ width: "100px", height: "100px" }} src={image} alt="Logo" />
          <ul style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexWrap: 'wrap'
          }}>
            <li style={{ marginRight: '20px' }}>
              <Link to={'/Landingpage'}><a style={{ textDecoration: 'none', color: '#333' }}>Home</a></Link>
            </li>
            <li style={{ marginRight: '20px' }}>
              <Link to={'/Register'}><a style={{ textDecoration: 'none', color: '#333' }}>Register</a></Link>
            </li>
            <li style={{ marginRight: '20px' }}>
              <Link to={'/Contact'}><a style={{ textDecoration: 'none', color: '#333' }}>Contact</a></Link>
            </li>
          </ul>
        </nav>
        <div style={{
          padding: '20px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
            width: "100%",
            maxWidth: "500px",
            margin: "0 auto"
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{ width: '100%', position: 'relative' }}>
                <div style={{
                  backgroundColor: '#e0e0f4',
                  height: '200px',
                  width: '100%',
                  borderRadius: '10px',
                  position: 'absolute',
                  top: '-10px',
                  zIndex: '-1'
                }} />
                <div style={{
                  backgroundColor: '#d9d9f7',
                  height: '200px',
                  width: '100%',
                  borderRadius: '10px',
                  position: 'absolute',
                  top: '-5px',
                  zIndex: '-2'
                }} />
              </div>

              <div className='todo' style={{
                fontFamily: "sans-serif",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                maxWidth: "500px",
                margin: "0 auto"
              }}>
                <h1>Welcome to your todos page</h1>
                <p>Please add your todos</p>
                <form className='todo-form' style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  marginBottom: "20px"
                }} onSubmit={handleAddTask}>
                  <label style={{ marginBottom: "5px" }}>
                    Title:
                    <input style={{
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "4px"
                    }} type="text" value={newTask.title} onChange={(event) => setNewTask({ ...newTask, title: event.target.value })} placeholder='Title' />
                  </label>
                  <br />
                  <label style={{ marginBottom: "5px" }}>
                    Description:
                    <input style={{
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "4px"
                    }} type="text" value={newTask.description} onChange={(event) => setNewTask({ ...newTask, description: event.target.value })} />
                  </label>
                  <br />
                  <label style={{ marginBottom: "5px" }}>
                    Priority:
                    <select style={{
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "4px"
                    }} value={newTask.priority} onChange={handlePriorityChange}>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </label>
                  <br />
                  <button style={{
                    padding: "10px 20px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }} type="submit">Add Task</button>
                </form>
                <ul style={{
                  listStyle: "none",
                  padding: "0",
                  marginBottom: "20px"
                }}>
                  {tasks.map((task) => (
                    <li key={task.id} style={{
                      backgroundColor: "#F4F4F4",
                      padding: "15px",
                      borderRadius: "4px",
                      marginBottom: "10px"
                    }}>
                      <h2>{task.title}</h2>
                      <p>{task.description}</p>
                      <p>Priority: {task.priority}</p>
                      <button style={{
                        backgroundColor: "#008CBA",
                        color: "white",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginRight: "10px"
                      }} className='edit-btn' onClick={() => setEditingTask(task)}>Edit</button>
                      <button style={{
                        backgroundColor: "#F44336",
                        color: "white",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        cursor: "pointer"
                      }} className='delete-btn' onClick={() => handleDeleteTask(task.id)}>Delete</button>
                      {editingTask === task && (
                        <form style={{ marginTop: '10px' }} onSubmit={(event) => { event.preventDefault(); handleUpdateTask(editingTask); }}>
                          <label style={{ marginBottom: "5px" }}>
                            Title:
                            <input style={{
                              padding: "8px",
                              border: "1px solid #ccc",
                              borderRadius: "4px"
                            }} type="text" value={editingTask.title} onChange={(event) => handleEditTaskChange(event, 'title')} />
                          </label>
                          <br />
                          <label style={{ marginBottom: "5px" }}>
                            Description:
                            <input style={{
                              padding: "8px",
                              border: "1px solid #ccc",
                              borderRadius: "4px"
                            }} type="text" value={editingTask.description} onChange={(event) => handleEditTaskChange(event, 'description')} />
                          </label>
                          <br />
                          <label style={{ marginBottom: "5px" }}>
                            Priority:
                            <select style={{
                              padding: "8px",
                              border: "1px solid #ccc",
                              borderRadius: "4px"
                            }} value={editingTask.priority} onChange={(event) => handleEditTaskChange(event, 'priority')}>
                              <option value="easy">Easy</option>
                              <option value="medium">Medium</option>
                              <option value="hard">Hard</option>
                            </select>
                          </label>
                          <br />
                          <button style={{
                            padding: "10px 20px",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                          }} type="submit">Update Task</button>
                        </form>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <footer style={{
          backgroundColor: 'rgb(239, 225, 224)',
          color: '#fff',
          padding: '20px',
          marginTop: '20px',
          textAlign: 'center'
        }}>
          <p>&copy;Task7 Todo List Sanele Mkhize.</p>
        </footer>
      </div>
    </>
  );
}

export default Todo;

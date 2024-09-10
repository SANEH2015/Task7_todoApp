import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image from '../assets/lg-removebg-preview.png';

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium' });
  const [editingTask, setEditingTask] = useState(null);

  // Fetch tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('http://localhost:3001/todo')
      .then(response => {
        console.log('Tasks fetched:', response.data); // Debugging line
        setTasks(response.data);
      })
      .catch(error => console.error('Error fetching tasks:', error));
  };

  const handleAddTask = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/todo', newTask)
      .then(response => {
        console.log('Task added:', response.data); // Debugging line
        setTasks([...tasks, response.data]);
        setNewTask({ title: '', description: '', priority: 'medium' });
      })
      .catch(error => console.error('Error adding task:', error));
  };

  const handleUpdateTask = (event) => {
    event.preventDefault();
    if (editingTask) {
      axios.put(`http://localhost:3001/todo/${editingTask.id}`, editingTask)
        .then(response => {
          console.log('Task updated:', response.data); // Debugging line
          setTasks(tasks.map(t => t.id === editingTask.id ? response.data : t));
          setEditingTask(null);
        })
        .catch(error => console.error('Error updating task:', error));
    }
  };

  const handleDeleteTask = (taskId) => {
    axios.delete(`http://localhost:3001/todo/${taskId}`)
      .then(response => {
        console.log('Task deleted:', taskId); // Debugging line
        setTasks(tasks.filter(t => t.id !== taskId));
      })
      .catch(error => console.error('Error deleting task:', error));
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
              <Link to="/Landingpage" style={{ textDecoration: 'none', color: '#333' }}>Home</Link>
            </li>
            <li style={{ marginRight: '20px' }}>
              <Link to="/Register" style={{ textDecoration: 'none', color: '#333' }}>Register</Link>
            </li>
            <li style={{ marginRight: '20px' }}>
              <Link to="/Contact" style={{ textDecoration: 'none', color: '#333' }}>Contact</Link>
            </li>
          </ul>
        </nav>
        <div className='todo' style={{ fontFamily: "sans-serif", display: "flex", flexDirection: "column", alignItems: "center", width: "500px", margin: "0 auto" }}>
          <h1>Welcome to your todos page</h1>
          <p>Please add your todos</p>
          <form className='todo-form' style={{ display: "flex", flexDirection: "column", width: "100%", marginBottom: "20px" }} onSubmit={handleAddTask}>
            <label style={{ marginBottom: "5px" }}>
              Title:
              <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} type="text" value={newTask.title} onChange={(event) => setNewTask({ ...newTask, title: event.target.value })} placeholder='Title' />
            </label>
            <label style={{ marginBottom: "5px" }}>
              Description:
              <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} type="text" value={newTask.description} onChange={(event) => setNewTask({ ...newTask, description: event.target.value })} />
            </label>
            <label style={{ marginBottom: "5px" }}>
              Priority:
              <select style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} value={newTask.priority} onChange={handlePriorityChange}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>
            <button style={{ padding: "10px 20px", backgroundColor: "rgb(64, 150, 255)", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }} type="submit">Add Task</button>
          </form>
          <ul style={{ listStyle: "none", padding: "0", marginBottom: "20px" }}>
            {tasks.map((task) => (
              <li key={task.id} style={{ backgroundColor: "#F4F4F4", padding: "15px", borderRadius: "4px", marginBottom: "10px" }}>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <p>Priority: {task.priority}</p>
                <button style={{ backgroundColor: "#008CBA", color: "white", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer", marginRight: "10px" }} className='edit-btn' onClick={() => setEditingTask(task)}>Edit</button>
                <button style={{ backgroundColor: "#F44336", color: "white", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer" }} className='delete-btn' onClick={() => handleDeleteTask(task.id)}>Delete</button>
                {editingTask && editingTask.id === task.id && (
                  <form style={{ marginTop: '10px' }} onSubmit={handleUpdateTask}>
                    <label style={{ marginBottom: "5px" }}>
                      Title:
                      <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} type="text" value={editingTask.title} onChange={(event) => handleEditTaskChange(event, 'title')} />
                    </label>
                    <label style={{ marginBottom: "5px" }}>
                      Description:
                      <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} type="text" value={editingTask.description} onChange={(event) => handleEditTaskChange(event, 'description')} />
                    </label>
                    <label style={{ marginBottom: "5px" }}>
                      Priority:
                      <select style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} value={editingTask.priority} onChange={(event) => handleEditTaskChange(event, 'priority')}>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </label>
                    <button style={{ padding: "10px 20px", backgroundColor: "rgb(64, 150, 255)", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }} type="submit">Update Task</button>
                  </form>
                )}
              </li>
            ))}
          </ul>
        </div>
        <footer style={{
          backgroundColor: 'rgb(239, 225, 224)',
          color: '#fff',
          padding: '20px',
          marginTop: '20px',
          textAlign: 'center'
        }}>
          <p>&copy; Task7 Todo List Sanele Mkhize.</p>
        </footer>
      </div>
    </>
  );
}

export default Todo;

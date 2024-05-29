import React, { useState, useEffect } from 'react';
import './ToDoList.css'; // Import CSS file

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputTask, setInputTask] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedTasks, setSortedTasks] = useState([]);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Sort tasks alphabetically
  useEffect(() => {
    const sorted = [...tasks].sort((a, b) => a.text.localeCompare(b.text));
    setSortedTasks(sorted);
  }, [tasks]);

  const handleInputChange = (e) => {
    setInputTask(e.target.value);
  };

  const handleAddTask = () => {
    if (inputTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: inputTask, completed: false }]);
      setInputTask('');
    }
  };

  const handleRemoveTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleToggleCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={inputTask}
          onChange={handleInputChange}
          placeholder="Add a new task"
          className="task-input"
        />
        <button onClick={handleAddTask} className="add-button">Add Task</button>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search tasks"
          className="search-input"
        />
      </div>
      <ul className="task-list">
        {sortedTasks.filter(task => task.text.toLowerCase().includes(searchTerm.toLowerCase())).map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleCompletion(task.id)}
            />
            <span>{task.text}</span>
            <button onClick={() => handleRemoveTask(task.id)} className="remove-button">Remove</button>
          </li>
        ))}
      </ul>
      <h5>copyright @Samriddhi Mishra</h5>
    </div>
  );
};

export default ToDoList;

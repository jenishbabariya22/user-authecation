import React from 'react';

const TaskList = ({ tasks }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task._id} className="task-item">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Priority: {task.priority}</p>
          <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
          <p>Status: {task.completed ? 'Completed' : 'In Progress'}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;

// controllers/taskController.js
const Task = require('../models/Task');
const User = require('../models/User');

// @desc    Get all tasks for the logged-in user or for admin all tasks
// @route   GET /api/tasks
// @access  Private (User/Admin)
exports.getTasks = async (req, res) => {
  try {
    let tasks;
    if (req.user.role === 'Admin') {
      tasks = await Task.find().populate('user', 'username email');
    } else {
      tasks = await Task.find({ user: req.user._id });
    }
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err.message });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private (User/Admin)
exports.createTask = async (req, res) => {
  const { title, description, priority, dueDate } = req.body;

  try {
    // Limit regular users to 10 tasks
    if (req.user.role === 'User') {
      const userTaskCount = await Task.countDocuments({ user: req.user._id });
      if (userTaskCount >= 10) {
        return res.status(400).json({ message: 'Task limit reached for regular users' });
      }
    }

    const newTask = await Task.create({
      title,
      description,
      priority,
      dueDate,
      user: req.user._id,
    });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Error creating task', error: err.message });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private (User/Admin)
exports.updateTask = async (req, res) => {
  const { id } = req.params;

  try {
    let task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check ownership if the user is not an Admin
    if (task.user.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Unauthorized to update this task' });
    }

    task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task', error: err.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private (User/Admin)
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check ownership if the user is not an Admin
    if (task.user.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Unauthorized to delete this task' });
    }

    await task.remove();
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task', error: err.message });
  }
};

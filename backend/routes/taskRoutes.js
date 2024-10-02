const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { protect, admin } = require('../middlewares/authMiddleware');

// Protected Routes for Users and Admins
router.get('/', protect, taskController.getTasks);
router.post('/', protect, taskController.createTask);
router.put('/:id', protect, taskController.updateTask);
router.delete('/:id', protect, taskController.deleteTask);

module.exports = router;

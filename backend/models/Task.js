  const mongoose = require('mongoose');

  const TaskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    },
    status: {
      type: String,
      enum: ['In Progress', 'Completed', 'Overdue'],
      default: 'In Progress'
    },
    dueDate: {
      type: Date,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }, { timestamps: true });       
  module.exports = mongoose.model('Task', TaskSchema);

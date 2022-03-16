const express = require('express');

//controllers

const {
	getAllTasks,
	createTask,
	updateTaskPut,
	deleteTask
} = require('../controllers/task.controller.js');

const router = express.Router();

router.get('/', getAllTasks);

// POST http://localhost:4000/posts
router.post('/', createTask);

// PUT http://localhost:4000/posts/:id
router.put('/:id', updateTaskPut);

// DELETE http://localhost:4000/posts/:id
router.delete('/:id', deleteTask);

module.exports = { taskRouter: router };


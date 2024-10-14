const express = require('express');
const isAuth = require('../Middleware/isAuth');
const { addNewTask, getAllUserTasks, removeTask, getTaskById, EditTask } = require('../controllers/taskController');
const router = express.Router();

const addTaskMiddleware = (req, res, next) => {
  addNewTask(req, res, next); // Call the controller function within middleware
};

router.post('/add-task', isAuth, addTaskMiddleware); // Use the middleware
router.get('/get-user-tasks', isAuth, getAllUserTasks)
router.get('/get-task/:taskId', isAuth, getTaskById)
router.post('/remove-task', isAuth, removeTask)
router.post('/edit-task', isAuth, EditTask)

module.exports = router;

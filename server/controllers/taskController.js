const { connection } = require("../dbConfig/mysqlConnection")
const { Attachment } = require("../models/taskAttachment")
const fs = require('fs');

const addNewTask = async (req, res) => {
  const { userId } = req.user
  const { title, description, DueDate, status, category } = req.body;
  const { file } = req; 

  try {
    const addTaskQuery = 'INSERT INTO tasks (title, description, DueDate, status, category, userId) VALUES(?, ?, ?, ?, ?, ?)';
    connection.query(addTaskQuery, [title, description, DueDate, status, category, userId], async (error, result) => {
      if (error) {
        return res.status(500).json({ Error: 'Internal server Error' });
      }

      if (file) {
        const fileBuffer = fs.readFileSync(file.path);
        const newAttachment = new Attachment({
          userId,
          taskId: result.insertId,
          name: file.filename,
          data: fileBuffer
        });
        await newAttachment.save();
      }

      return res.status(201).json({ message: 'Task added successfully' });
    });
  } catch (error) {
    console.error('Error adding new task:', error);
    return res.status(500).json({ Error: 'Internal Server Error' });
  }
};

const getAllUserTasks = async (req, res) => {
    const { userId } = req.user;
    
    const getTasksQuery = 'SELECT * FROM tasks WHERE userId = ?';
    connection.query(getTasksQuery, [userId], async (error, results) => {
        if (error) {
        return res.status(500).json({ Error: 'Internal server Error' });
        }

        const attachments = await Attachment.find({ userId: userId })
    
        return res.status(200).json({ tasks: results, attachments: attachments });
    });
}

const removeTask = async (req, res) => {
  const { taskId } = req.body
  deleteQuery = 'DELETE FROM tasks WHERE id = ?'
  connection.query(deleteQuery, [taskId], async (err, result) => {
    if (err) {
      return res.status(500).json({ Error: err.message });
    }
    const taskAttachment = await Attachment.findOne({ taskId: taskId })
    if (!taskAttachment) {
      return res.status(200).json({ message: 'Task deleted successfully' });
    }

    await Attachment.deleteOne({ taskId: taskId })
    return res.status(200).json({ message: 'Task deleted successfully' });
  })
}

const getTaskById = async (req, res) => {
  const { taskId } = req.params
  const getTaskQuery = 'SELECT * FROM tasks WHERE id = ?'
  connection.query(getTaskQuery, [taskId], async (err, result) => {
    if (err) {
      return res.status(500).json({ Error: err.message });
    }
    const attachment = await Attachment.findOne({ taskId: taskId })
    return res.status(200).json({ task: result[0], attachment: attachment });
  })

}

const EditTask = async (req, res) => {
  const { taskId, title, description, DueDate, status, category } = req.body;
  const { file } = req;

  const updateQuery = 'UPDATE tasks SET title = ?, description = ?, DueDate = ?, status = ?, category = ? WHERE id = ?';

  connection.query(updateQuery, [title, description, DueDate, status, category, taskId], async (err, result) => {
    if (err) {
      return res.status(500).json({ Error: err.message });
    }

    if (file) {
      const fileBuffer = fs.readFileSync(file.path);
      const taskAttachment = await Attachment.findOne({ taskId: taskId })
      if (!taskAttachment) {
        const newAttachment = new Attachment({
          userId: req.user.userId,
          taskId,
          name: file.filename,
          data: fileBuffer
        });

        await newAttachment.save();

      } else {
        await Attachment.updateOne({ taskId: taskId }, { name: file.filename, data: fileBuffer });
      }
    }

    return res.status(200).json({ message: 'Task updated successfully' });
  })
}

module.exports = {addNewTask, getAllUserTasks, removeTask, getTaskById, EditTask}
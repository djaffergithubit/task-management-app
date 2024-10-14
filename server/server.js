const express = require('express')
const ConnectMongo = require('./dbConfig/dbConfig')
const app = express()
const { connection } = require('./dbConfig/mysqlConnection')
const cors = require ('cors')
const bodyParser = require('body-parser')
const path = require('path');
const port = 3500

require('dotenv').config()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}
))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

// static file
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MULTER CONFIG
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname)
  }
})

const upload = multer({storage: storage})

  // Connect to MySQL
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });
  
  // SQL query to create a table
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL,
      password VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const createTasksTable = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(50) NOT NULL,
      description VARCHAR(100) NOT NULL,
      DueDate DATE NOT NULL,
      status VARCHAR(100) NOT NULL,
      category VARCHAR(100) NOT NULL,
      userId VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  // Execute the create table query
  connection.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating table:', err);
      return;
    }
    console.log('Table created successfully:', result);
  });

  connection.query(createTasksTable, (err, result) => {
    if (err) {
      console.error('Error creating table:', err);
      return;
    }
    console.log('Table created successfully:', result);
  });

// Routes
app.use('/users', upload.single('image'), require('./Routes/userRouter'))
app.use('/tasks', upload.single('attachment'), require('./Routes/taskRouter'))

// socket.io config
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('task deleted', (message) => {
    io.emit('task deleted', message)
  })

  socket.on('edit profile', (message) => {
    io.emit('edit profile', message)
  })

  socket.on('task edited', (message) => {
    io.emit('task edited', message)
  })

  socket.on('disconnected', ()=>{
    console.log('user disconnected')
  })
}
)

http.listen(port, ()=>{
    console.log(`server running on port ${port}`);
    ConnectMongo()
})
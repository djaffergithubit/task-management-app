// const mongoose = require("mongoose");

// const ConnectMongo = () => {
//     mongoose.connect("mongodb+srv://etudiantg10:dkloa123@cluster0.2rrouid.mongodb.net/");
//     const connection = mongoose.connection;

//     connection.on('connected', () => {
//         console.log('connected to mongodb');
//     });

//     connection.on('error', (err) => {
//         console.log(err);
//     });
// };

// module.exports = ConnectMongo;

const mongoose = require('mongoose');

const ConnectMongo = () => {
    // Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  // Get the default connection
  const db = mongoose.connection;
  
  // Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  
  // Bind connection to open event (to get notification when connection is established)
  db.once('open', function () {
    console.log('Connected to MongoDB');
  });
  
}

module.exports = ConnectMongo
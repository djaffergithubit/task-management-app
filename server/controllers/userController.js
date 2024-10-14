const { connection } = require('../dbConfig/mysqlConnection');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { UserImage } = require('../models/image');

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Check if email already exists in MySQL
  const checkEmailQuery = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
  connection.query(checkEmailQuery, [email], async (err, result) => {
    if (err) {
      console.error('Error checking email:', err);
      return res.status(500).json({ error: 'Error creating user' });
    }
    const emailCount = result[0].count;
    if (emailCount > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user data into MySQL
    const createUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    connection.query(createUserQuery, [username, email, hashedPassword], async (err, result) => {
      if (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ error: 'Error creating user' });
      }

      const userId = result.insertId;

      const userImage = new UserImage({
        userId,
        image: req.file ? req.file.filename : '' 
      });

      userImage.save()
      return res.status(201).json({ message: 'User created successfully' });
    });
  });
};

const signInUser = async (req, res) => {
    const { email, password } = req.body;

    // Check if email exists
    const checkEmailQuery = 'SELECT * FROM users WHERE email =?';
    connection.query(checkEmailQuery, [email], async (error, results) => {
      if (error) throw error;
      if (results.length === 0) return res.status(401).json({ Error: 'Email or password is incorrect' });
  
      const user = results[0];
      const hashedPassword = user.password;
  
      // Compare password
      const isValid = await bcrypt.compare(password, hashedPassword);
      if (!isValid) return res.status(401).json({ Error: 'Email or password is incorrect' });
  
      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, process.env.SECRET_TOKEN, { expiresIn: '1h' });
      res.cookie('token', token, {
        httpOnly: true,
        secure: true
      })
  
      return res.status(201).json({ 'message': 'loggedIn successfully', token: token })
    })
}

const getUser = async (req, res) => {
    const { userId } = req.user

    sqlQuery = 'SELECT * FROM users WHERE id=?'
    connection.query(sqlQuery, [userId], async (err, result) => {
        if (err) throw err;
        if (result.length === 0) return res.status(401).json({ Error: 'Email or password is incorrect' });

        const user = result[0];

        if (user) {
          const userProfileImage = await UserImage.findOne({ userId: user.id })
          if (!userProfileImage) {
            return res.status(404).json({ 'message': 'image not found' })
          }

          return res.status(201).json({...user, profileImage: userProfileImage.image} )
        }

    })
}


const editUserProfile = async (req, res) => {
  const { userId } = req.user;
  const { username, email, password } = req.body;
  const { file } = req;

  const editQuery = 'SELECT * FROM users WHERE id = ?';

  connection.query(editQuery, [userId], async (err, result) => {
    if (err) {
      return res.status(500).json({ Error: 'Internal Server' });
    }
    if (result.length === 0) {
      return res.status(404).json({ Error: 'User not found' });
    }

    const user = result[0];
    let updateFields = [];
    let updateValues = [];

    if (username && username !== user.username) {
      updateFields.push('username = ?');
      updateValues.push(username);
    }
    if (email && email !== user.email) {
      updateFields.push('email = ?');
      updateValues.push(email);
    }

    if (updateFields.length > 0) {
      const updateQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
      connection.query(updateQuery, [...updateValues, userId], async (err, result) => {
        if (err) {
          return res.status(500).json({ Error: 'Internal Server' });
        }
      });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const editPasswordQuery = 'UPDATE users SET password = ? WHERE id = ?';
      connection.query(editPasswordQuery, [hashedPassword, userId], (err, queryResult) => {
        if (err) {
          return res.status(500).json({ Error: 'Internal Server' });
        }
      });
    }

    if (file) {
      // Update user image
      const userImage = await UserImage.findOne({ userId: userId });
      if (!userImage) {
        const newUserImage = new UserImage({
          userId,
          image: file.filename
        });
        await newUserImage.save();
      } else {
        userImage.image = file.filename;
        await userImage.save();
      }
    }

    return res.status(200).json({ message: 'User updated successfully' });
  });
};


module.exports = { createUser, signInUser, getUser, editUserProfile }
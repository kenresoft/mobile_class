const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// In-memory database to store users (replace with a real database)
let users = [
  { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'janesmith@example.com' },
];

// GET /users
app.use('/', express.static(path.join(__dirname, '')));

app.get('/users', (req, res) => {
  res.status(200).json({ success: true, users });
});

// GET /users/:id
app.get('/users/:id', (req, res) => {
  const user = users.find(user => user.id === parseInt(req.params.id));
  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(404).json({ success: false, error: 'User not found' });
  }
});

// POST /users
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    ...req.body,
  };
  users.push(newUser);
  res.status(201).json({ success: true, user: newUser });
});

// PUT /users/:id
app.put('/users/:id', (req, res) => {
  const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
  if (userIndex !== -1) {
    users[userIndex] = {
      ...users[userIndex],
      ...req.body,
    };
    res.json({ success: true, user: users[userIndex] });
  } else {
    res.status(404).json({ success: false, error: 'User not found' });
  }
});

// DELETE /users/:id
app.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.json({ success: true, message: 'User deleted' });
  } else {
    res.status(404).json({ success: false, error: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
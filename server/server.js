const express = require('express');
const app = express();
require('dotenv').config({ path: './config/.env' });
const connectDB = require('./config/db');

const PORT = process.env.PORT || 4000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('HELLO ' + process.env.MONGO_URI);
});

///////
app.use('/api/notes', require('./routes/api/note'));

///////

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
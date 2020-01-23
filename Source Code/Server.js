const express = require('express');
const cors = require('cors');
// const mongo = require('./DB')

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json('Server is working');
  });

app.use('/users', require('./supServer/users'));
app.use('/posts', require('./supServer/posts'));



const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`You are Listening to PORT: ${PORT}`))
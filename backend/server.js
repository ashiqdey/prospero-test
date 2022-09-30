require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');


// ----------- express configs -----------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

// ----------- cors -----------
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"]
}));


// ----------- configs -----------
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || '';


// ----------- mongo db connection -----------
mongoose.connect(MONGO_URL, {
  dbName: 'prospero',
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(err => {
    console.error("ERR mongodb", err);
  });
// ----------- END mongo db connection -----------



// ----------- start server -----------
app.listen(PORT, () => {
  console.log(`prospero running on port ${PORT}`);
})



// ----------- routes -----------
const studentRoutes = require('./routes/student.route');
app.use('/students', studentRoutes);
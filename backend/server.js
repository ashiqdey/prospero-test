require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');
const path = require('path');
const fs = require("fs");
const https = require("https");


// ----------- configs -----------
const server_config = {
    NODE_ENV: process.env.NODE_ENV || 'dev',
    HTTPS: process.env.HTTPS,

    SSL_KEY: process.env.SSL_KEY,
    SSL_CRT: process.env.SSL_CRT,
    SSL_CAB: process.env.SSL_CAB,

    PORT: process.env.PORT || 5002,
    MONGO_URL : process.env.MONGO_URL || '',
}



// ----------- express configs -----------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))


// ----------- cors -----------
if(server_config.NODE_ENV === 'dev'){
  app.use(cors({
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"]
  }));
}


// ----------- mongo db connection -----------
mongoose.connect(server_config.MONGO_URL, {
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
if (server_config.HTTPS == 'https') {
   
    const options = {
        key: fs.readFileSync(server_config.SSL_KEY),
        cert: fs.readFileSync(server_config.SSL_CRT),
        ca: [fs.readFileSync(server_config.SSL_CAB), fs.readFileSync(server_config.SSL_CRT)],
        requestCert: false,
        rejectUnauthorized: false
    }
    server = https.createServer(options, app);
}
else {
    server = require('http').Server(app);
}


server.listen(server_config.PORT, () => {
    console.log(`prospero running : ${server_config.HTTPS}://localhost:${server_config.PORT}`);
})




// ----------- routes -----------
const studentRoutes = require('./routes/student.route');
app.use('/students', studentRoutes);
app.get(`/`, (req, res) => { res.sendFile(__dirname + '/public/index.html'); });


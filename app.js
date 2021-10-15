const express = require('express');
const axios = require('axios')
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const fileUpload = require('express-fileUpload');

dotenv.config({ path: './.env' });
const db = require('./model/db');

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());

app.use(fileUpload());

app.set('view engine', 'hbs');

const publicDirectoryPath = path.join(__dirname, "./public");
const uploadsDirectoryPath = path.join(__dirname, "./uploads");

app.use(express.static(publicDirectoryPath));
app.use("/uploads",express.static(uploadsDirectoryPath));

db.start.connect(function(err) {
  if(err) {
    console.log('Error connecting to the database');
  } else {
    console.log('Connected to MYSQL');
  }
});

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5020, () => {
  console.log(uploadsDirectoryPath)
  console.log("listening on port 5020");
})
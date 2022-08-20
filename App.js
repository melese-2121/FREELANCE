const express = require("express");
const { Op } = require('sequelize');

const site = require('./Routes/site');
const admin = require('./Routes/admin');

// Create and new instance of express(App)
const app = express();
// Set view engine
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

//Use site router 
app.use('/', site );

//Use admin router
app.use('/admin', admin)

// Create server for App instance
app.listen(8000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server listening on port 8000...");
  }
});

const express = require('express');
const router = express.Router();

const sequelize = require('../connection/db.js');
const Feedback = require('../models/Feedback.js');
const Job = require('../models/Job');

// Fetch data from database middleware
const fetch_data = async (req, res, next) => {
  global.data = await Job.findAll();

  next();
}

// Fetch recently added data from DB
const fetch_recent_data = async (req, res, next) => {
  const data = await Job.findAll();
  for(let i = 0; i < data.length/2; i++){
    data.shift();
  }
  global.recent_data = data;
  

  next();
}

// Home page
router.get("/", fetch_recent_data, (req, res) => {
  res.render("home", {
    notifications: global.recent_data
  });
});

// Show page
router.get("/posts", fetch_data, (req, res) => {

  console.log(global.data)
  res.render("posts", {
    notifications: global.data
  });
});

// Feedback page
router.get("/feedback", (req, res) => {
  res.render("feedback", { });
});

// About page
router.get("/about", (req, res) => {
  res.render("about", {});
});

// feedback_post page
router.post('/feedback_post', (req, res) => {
  sequelize.sync({alter: true})
           .then((data) => {
            return Feedback.create({
              email: req.body.email,
              body: req.body.body
            })
           })
           .then((newFeedback) => {
            return Feedback.findAll()
           })
           .then((feedbacks) => {
            
            res.render('show_feedback', {
              feedbacks
            })

           })
           .catch((err) => {
            console.log('Error occured: ', err);
           })
    
  })

  module.exports = router;
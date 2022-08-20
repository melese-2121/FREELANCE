const express = require('express');
const router = express.Router();

const { notifications } = require("../notifications");
const sequelize = require('../connection/db.js');
const Feedback = require('../models/Feedback.js');




// Home page
router.get("/", (req, res) => {
  res.render("home", {
    notifications,
  });
});

// Show page
router.get("/posts", (req, res) => {
  res.render("posts", {
    notifications
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
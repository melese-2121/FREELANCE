const express = require("express");
const router = express.Router();

// Require DB connection
const sequelize = require("../connection/db");
// Require job model
const Job = require("../models/job");

router.get("/", (req, res) => {
  res.render("admin", {});
});

router.get("/add_job", (req, res) => {
  res.render("add_job", {});
});

router.post("/add_job", (req, res) => {
  //Destructure req.body object
  const { company, location, requirements, initial, final } = req.body;

  sequelize
    .sync({ alter: true })
    .then((data) => {

        // Add a new job
      return Job.create({
        company: company,
        location: location,
        requirements: requirements,
        initial: initial,
        final: final,
      }).then((newJob) => {
        console.log(newJob);
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
    });

  res.send("Welcome");
});

router.get("/edit_job", (req, res) => {
  res.render("edit_job", {});
});

// Edit_job job
router.put("/edit_job/update", (req, res) => {
  res.send('Welcome')
})
// Delete job
router.delete("/edit_job/delete", (req, res) => {
  res.send('Welcome')
})
// Update a job
router.put("/edit_job/update", (req, res) => {
  res.send('Welcome')
})
// Show all job list 
router.get("/edit_job/show", (req, res) => {
  res.send('Welcome')
})


module.exports = router;

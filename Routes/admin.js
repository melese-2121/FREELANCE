const express = require("express");
const router = express.Router();

// Require DB connection
const sequelize = require("../connection/db");
// Require Job table
const job = require('../models/Job');

// Define fetch data middleware
const fetch_data = async (req, res, next) => {
  global.jobs = await job.findAll();
  next();
}

// Define search job middleware
const search_job = async (req, res, next) => {

  global.search_id = req.body.search_id;
  if(search_id){
    global.data = await job.findOne({
      where: {
        id: search_id
      }
    })
  }
  next();
}

// Define update job middleware
const update_job = async (req, res, next) => {
  const { company, location, requirements, initial, final } = req.body;

  if(global.search_id){
    const newJob = await job.update({
      company: company,
      location: location,
      requirements: requirements,
      initial: initial,
      final: final
    }, { where: { id: global.search_id}});
    console.log(newJob)
  }
  next();
}

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
      return job.create({
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

  res.send('Welcome');
});

router.get("/edit_job", (req, res) => {
  res.render("edit_job", {});
});

// Edit_job job
router.get("/edit_job/update", (req, res) => {

  res.render('update_job', {job: global.data});
})
// Delete job
router.delete("/edit_job/delete", (req, res) => {
  res.send('Welcome')
})
// Update a job
router.post("/edit_job/update", search_job, update_job, (req, res) => {
  const { search_id } = req.body;

  res.render('update_job', {
    job: global.data
  })
})

// Show all job list 
router.get("/edit_job/show", fetch_data, (req, res) => {
  const jobs = global.jobs;
  res.render('show_jobs', { jobs });
})


module.exports = router;

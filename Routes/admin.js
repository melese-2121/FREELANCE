const express = require("express");
const { NULL } = require("mysql/lib/protocol/constants/types");
const router = express.Router();

// Require DB connection
const sequelize = require("../connection/db");
// Require Job table
const Job = require("../models/Job");

// Define fetch data middleware
const fetch_data = async (req, res, next) => {
  global.jobs = await Job.findAll();
  next();
};

// Define search job middleware
const search_job = async (req, res, next) => {
  const { search_id } = req.body;
  if (req.body.search_id) {
    global.search_id = req.body.search_id;
  }

  if (search_id) {
    global.data = await Job.findOne({
      where: {
        id: search_id,
      },
    });
  }
  next();
};

// Define update job middleware
const update_job = async (req, res, next) => {
  const { company, location, requirements, initial, final } = req.body;

  if (global.search_id) {
    Job.sync({ alter: true })
      .then((data) => {
        return Job.update(
          {
            id: global.search_id,
            company: company,
            location: location,
            requirements: requirements,
            initial: initial,
            final: final,
          },
          { where: { id: global.search_id } }
        );
      })
      .then((data) => {})
      .catch((err) => {
        console.log(err);
      });
  }
  next();
};

// Define delete job middleware
const delete_job = async (req, res, next) => {
  if(global.search_id){
    const result = await Job.destroy({where: { id: global.search_id}});
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

  Job.sync({ alter: true })
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
res.redirect('/admin/add_job');
});

router.get("/edit_job", (req, res) => {
  res.render("edit_job", {});
});

// Show all job list
router.get("/edit_job/show", fetch_data, (req, res) => {
  const jobs = global.jobs;
  res.render("show_jobs", { jobs });
});

// update job
router.get("/edit_job/update", (req, res) => {
  res.render("update_job", { job: global.data });
});

// Update a job
router.post("/edit_job/update", search_job, update_job, (req, res) => {
  const { search_id } = req.body;

  res.render("update_job", {
    job: global.data,
  });
});

// Delete job
router.get("/edit_job/delete", (req, res) => {
  
  global.search_id = '';
  console.log(global.search_id)
  res.render("delete_job", { job: global.data });
});

router.post("/edit_job/delete", search_job, delete_job, (req, res) => {
  res.render("delete_job", { job: global.data });
});

module.exports = router;

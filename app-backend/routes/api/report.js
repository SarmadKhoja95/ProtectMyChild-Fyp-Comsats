const express = require('express');
const router = express.Router();

//Item model
const Report = require('../../models/report');
const auth = require('../../middleware/auth');

// @route  POST api/reports/
//@desc  Register a new report
//@access private

router.post('/', auth, async (req, res) => {
  let { id } = req.user;

  const { name, age, profilePicture, city, location, radius, wearing, gender, info } = req.body;

  //Simple Validation
  if (!name || !age || !city) {
    return res.status(404).json({ msg: "Please Enter All Fields" });
  }
  try {
    const newReport = new Report({ name, age, profilePicture, city, wearing, location, radius, gender, info, user: id });
    let result = await newReport.save();
    return res.status(200).json({ status: 200, msg: "success", data: result });
  }
  catch (e) {
    console.log(e.message);
    return res.status(500).json({ status: 500, msg: e.message });
  }
});

// @route  GET api/reports/
//@desc  Get Reports Of User

router.get('/', auth, async (req, res) => {
  let { id } = req.user;
  try {
    let result = await Report.find({ user: id });
    let active = result.filter(val => val.status === "active");
    let closed = result.filter(val => val.status === "pending");
    return res.status(200).json({ status: 200, msg: "success", data: { result, total: result.length, active: active.length, closed: closed.length } });
  }
  catch (e) {
    console.log(e.message);
    return res.status(500).json({ status: 500, msg: e.message });
  }
});

// @route  GET api/reports/
//@desc  Get Reports Of User

router.get('/all', auth, async (req, res) => {
  let { id } = req.user;
  try {
    let reports = await Report.find();
    let allReports = reports.filter(val => val.user != id);
    return res.status(200).json({ status: 200, msg: "success", data: { result : allReports , total: allReports.length } });
  }
  catch (e) {
    console.log(e.message);
    return res.status(500).json({ status: 500, msg: e.message });
  }
});


module.exports = router;
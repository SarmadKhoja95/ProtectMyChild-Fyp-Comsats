const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require('config');
const ObjectID = require("bson-objectid");
//Item model
const Children = require('../../models/children');
const User = require('../../models/user');
const auth = require('../../middleware/auth');

// @route  POST api/reports/
//@desc  Register a new report
//@access private

router.post('/', auth, async (req, res) => {
  let { id } = req.user;
  const { name, picture, position, safeZone, contact } = req.body;

  //Simple Validation
  if (!name || !picture || !position || !safeZone) {
    return res.status(404).json({ msg: "Please Enter All Fields" });
  }
  try {
    const newChildren = new Children({ name, picture, position, positionHistory: [position], safeZone, contact, parent: id });
    let result = await newChildren.save();
    return res.status(200).json({ status: 200, msg: "success", data: result });
  }
  catch (e) {
    console.log(e.message);
    return res.status(500).json({ status: 500, msg: e.message });
  }
});

// @route  GET api/children/parent
//@desc  Get Reports Of User
router.get('/parent', auth, async (req, res) => {
  let { id } = req.user;
  try {
    let result = await Children.find({ parent: id });
    return res.status(200).json({ status: 200, msg: "success", data: result });
  }
  catch (e) {
    console.log(e.message);
    return res.status(500).json({ status: 500, msg: e.message });
  }
});

// @route  DELETE api/children
//@desc DELETE CHILD OF A PARENT

router.delete('/', auth, async (req, res) => {
  let { childrenId } = req.query;
  try {
    await Children.findByIdAndDelete(childrenId);
    return res.status(200).json({ status: 200, msg: "success" });
  }
  catch (e) {
    console.log(e.message);
    return res.status(500).json({ status: 500, msg: e.message });
  }
});


module.exports = router;

const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const Help = require('../../models/help');
const Request = require('../../models/requests');
const User = require('../../models/user');

const axios = require('axios');

// @route POST api/help/addHelp
//@desc  Add Help
//@access private

router.post('/addHelp', auth, async (req, res) => {
    let data = req.body;
    let {reportData} = req.body;
    let userData = await User.findById(data.toUserId);
    let help = new Help({ ...data , toUserName : userData.name, toUserEmail : userData.email, toUserCity : userData.city, toUserContact : userData.phone, toUserPicture : userData.profilePicture, toUserToken : userData.pushToken });
    let helpResult = await help.save();
    let request = new Request({ helpId: helpResult._id , ...data, toUserName : userData.name, toUserEmail : userData.email, toUserCity : userData.city, toUserContact : userData.phone, toUserPicture : userData.profilePicture, toUserToken : userData.pushToken });
    await request.save();
    // send Notification to Parent
    let msg = "A nearby Parent wants to help " + reportData.name;
      sendNotification( userData.pushToken, "New Help Request", "new help request", msg);
     return res.status(200).json({ msg: "success", data: helpResult });
});

// @route  GET api/help/getHelp
//@desc  Get Helped Reports Of User

router.post('/getHelp', auth, async (req, res) => {

     let { id } = req.body;
    try {
      let result = await Help.find({toUserId : id});
      let helpSend = await Help.find({fromUserId : id});
      let pending = result.filter(val => val.status === "pending");
      let ongoing = result.filter(val => val.status !== "pending");
      return res.status(200).json({ status: 200, msg: "success", data: { result, helpSend, pending, ongoing, pendingLength: pending.length, ongoingLength: ongoing.length } });
    }
    catch (e) {
      console.log(e.message);
      return res.status(500).json({ status: 500, msg: e.message });
    }
  });

  // @route PUT api/help/setHelpStatus
//@desc  Change status of Help
//@access private

router.put('/setHelpStatus', auth, async (req, res) => {

  const { status } = req.body;
  const { id } = req.query;

  try {
         let help = await Help.findById(id);
         let data = await Help.findByIdAndUpdate(id, { status: status }, { new: true });
         sendNotification(help.fromUserToken, "Request Update", "Request Accepted", "Your Request is Accepted By the Child Parent");
        
              return res.status(200).json({
                  status: 200,
                  msg: "request accepted",
                  data: data,
              });
  }
  catch (err) {
      console.log(err.message);
      return res.status(500).send({
          status: 500,
          msg: err.message,
      });
  }
});

router.put('/updateHelpData', auth, async (req, res) => {

  const { childPicture , note } = req.body;
  const { id } = req.query;
 
  try {
         let help = await Help.findOne({ reportId : id });
         let data = await Help.findOneAndUpdate({reportId : id} , { childPicture : childPicture , note : note , status : "found" }, { new: true });
         // send notification to child's parent
         let title = help.reportData.name + " Update";
         let msg = "Helping Parent has uploaded a picture. You must check it out !";
         sendNotification(help.toUserToken, title , "Found Child Data", msg);
        
              return res.status(200).json({
                  status: 200,
                  msg: "child data success",
                  data: data,
              });
  }
  catch (err) {
      console.log(err.message);
      return res.status(500).send({
          status: 500,
          msg: err.message,
      });
  }
});

async function sendNotification(pushToken, title, data, message) {
    let url = "https://exp.host/--/api/v2/push/send";
    let options = {
        headers: {
            'host': 'exp.host',
            'accept': 'application/json',
            'accept-encoding': 'gzip, deflate',
            'content-type': 'application/json',
        }
    };
    let body = JSON.stringify({ to: pushToken, title, data: { data }, body: message });
    await axios.post(url, body, options);
}

module.exports = router;
const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const Help = require('../../models/help');
const Request = require('../../models/requests');
const axios = require('axios');



// @route POST api/help/addHelp
//@desc  Add Help
//@access private

router.post('/addHelp', auth, async (req, res) => {
    let data = req.body;
    let help = new Help({ ...data });
    //console.log(data);
    let helpResult = await help.save();
    let request = new Request({ helpId: helpResult._id , ...data});
    console.log(request);
    await request.save();
    // send Notification to Parent
      //  sendNotification(provider.pushToken, "New Request", "new request", "New Oilex Request Received from Customer");
     return res.status(200).json({ msg: "success", data: helpResult });
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
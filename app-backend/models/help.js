const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HelpSchema = new Schema({
  reportId: {
    type: String,
    default:null
  },
  reportData:{
    type: Object,
    default:{}
  },
  fromUserId: {
    type: String,
    default:null
  },
  toUserId: {
    type: String,
    default:null
  },
  childPicture: {
    type: String,
    default: ""
  },
  note: {
    type: String,
    default:""
  },
  toUserToken: {
    type: String,
    default: ""
  },
  fromUserToken: {
    type: String,
    default: ""
  },
  fromUserName: {
    type: String,
    default: ""
  },
  fromUserContact: {
    type: String,
    default: "",
  },
  fromUserCity: {
    type: String,
    default: ""
  },
  fromUserEmail: {
    type: String,
    default: "",
  },
  fromUserPicture: {
    type: String,
    default: "",
  },
  toUserName: {
    type: String,
    default: ""
  },
  toUserContact: {
    type: String,
    default: "",
  },
  toUserCity: {
    type: String,
    default: ""
  },
  toUserEmail: {
    type: String,
    default: "",
  },
  toUserPicture: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: 'pending'
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});


const Help = mongoose.model('help', HelpSchema);

module.exports = Help;
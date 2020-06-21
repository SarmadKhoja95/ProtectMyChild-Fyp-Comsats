const mongoose = require('mongoose');
const { number } = require('mathjs');
const Schema = mongoose.Schema;


const userLocation = new Schema({
  longitude: {
    type: Number,
  },
  latitude: {
    type: Number,
  }
}, { _id: false });

//creating Report Schema
const ReportSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: null
  },
  wearing: {
    type: String,
    default: null
  },
  city: {
    type: String,
    required: true,
  },
  location: {
    type: userLocation
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  status: {
    type: String,
    default: 'active',
  }
}, { timestamps: true });

const Report = mongoose.model('reports', ReportSchema);

module.exports = Report;
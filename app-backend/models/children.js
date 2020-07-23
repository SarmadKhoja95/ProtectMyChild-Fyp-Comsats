const mongoose = require('mongoose');
const { string } = require('mathjs');
const Schema = mongoose.Schema;


const PositionSchema = new Schema({
  longitude: {
    type: String,
    default: ""
  },
  latitude: {
    type: String,
    default: ""
  },
  time: {
    type: Date,
    default: Date.now()
  }
});

const SafeZoneSchema = new Schema({
  longitude: {
    type: String,
    default: ""
  },
  latitude: {
    type: String,
    default: ""
  },
  radius: {
    type: String,
    default: ""
  }
});

//creating Children Schema
const ChildrenSchema = new Schema({
  name: {
    type: String,
    default: ""
  },
  picture: {
    type: String,
    default: ""
  },
  position: PositionSchema,
  parent: {
    type: String,
    default: ""
  },
  safeZone: SafeZoneSchema,
  positionHistory: [PositionSchema],
  contact: {
    type: String,
    default: ""
  }
}, { timestamps: true });

const Children = mongoose.model('Children', ChildrenSchema);

module.exports = Children;
const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  appearances: {
    pattern: String,
    mainColor: {
      type: String,
    }
  },
  toys: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  hasBestFriend: {
    type: Boolean,
  },
  treats: [{
    type: String,
    enum: ['bones', 'bacon', 'cheese', 'peanut butter']
  }],
  lengthOfLife: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('Dog', schema);
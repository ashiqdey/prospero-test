const mongoose = require('mongoose');
const { isEmail } = require('validator');
const autoIncrement = require("mongoose-auto-increment");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail, 'Invalid email']
  },
  subjects: {
    type: [String],
    required: true
  },
},
  { versionKey: false }
)

autoIncrement.initialize(mongoose.connection);
studentSchema.plugin(autoIncrement.plugin, {
  model: "Student",
  field: "_id",
  startAt: 1,
  incrementBy: 1,
});


module.exports = mongoose.model("Student", studentSchema);
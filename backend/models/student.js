const mongoose = require('mongoose');
const { isEmail } = require('validator');


const studentSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
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


module.exports = mongoose.model("Student", studentSchema);
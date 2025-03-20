const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const depSchema = new Schema({
  department: {
    type: String,
    required: true,
  },
 
});

const Department = mongoose.model("Department", depSchema);
module.exports = Department;

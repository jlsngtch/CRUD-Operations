const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Blueprint of how the data will look like .

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  //Update time stamp whenever an item is added or a new post is made
  { timestamps: true }
);

//We first define our schema...... lets now create a model using the schema
//It takes two arguments 1 the singular collection item and 2 the schema defined and we the finaly export the model to be used in CRUD Operation
const User = mongoose.model("User", UserSchema);
module.exports = User;

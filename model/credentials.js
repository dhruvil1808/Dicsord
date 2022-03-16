const mongoose = require("mongoose");
const schema = mongoose.Schema; //create a schema

const userSchema = new schema( //creating a schema
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    pno: { type: String, required: true },
    password: { type: String, required: true },
    dob: { type: String, required: true },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema); //creating a model with schema
module.exports = User;

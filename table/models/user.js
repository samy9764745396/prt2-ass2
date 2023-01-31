const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 const userSchema = new Schema({
    customer_id: { type: String, required: true },
  customer_name: { type: String, required: true },
  email: {type: String, required: true}
})

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;



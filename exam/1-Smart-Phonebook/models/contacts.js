var mongoose = require("mongoose"),
    Schema = mongoose.Schema,

    contactSchema = new Schema({
      phoneNumber : String,
      personIdentifier : String
    });

exports.contact = mongoose.model("contact", contactSchema);

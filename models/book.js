var mongoose = require("mongoose");
//var passportLocalMongoose=require("passport-local-mongoose");
var BookSchema = new mongoose.Schema({
  day: String,
  strttime: String,
  endtime: String,
  // duration:String,
  lt: String,
  ask: { id: { type: mongoose.Schema.Types.ObjectId, ref: "User" } },
  book_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bk: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  intersect: { type: Number, default: 0 }
  //author:{id:{type:mongoose.Schema.Types.ObjectId,ref:"User"}}
});

//BookSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Book", BookSchema);

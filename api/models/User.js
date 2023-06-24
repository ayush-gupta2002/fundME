const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    campaigns: [{ type: mongoose.Schema.Types.ObjectId }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId }],
    orders: [{ type: mongoose.Schema.Types.ObjectId }],
    profilePic: [
      {
        type: String,
        default:
          "https://firebasestorage.googleapis.com/v0/b/fundme-6ee6d.appspot.com/o/images%2Fplaceholder.jpeg?alt=media&token=4193d35b-f3a9-4e3c-99be-0b83df9126d9",
      },
    ],
    workDesc: [{ type: String }],
  },
  { timestamps: true }
);
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);

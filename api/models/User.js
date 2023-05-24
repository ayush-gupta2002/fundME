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
          "https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA=",
      },
    ],
    workDesc: [{ type: String }],
  },
  { timestamps: true }
);
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);

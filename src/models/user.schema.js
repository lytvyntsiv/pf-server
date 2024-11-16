import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  userLevel: { type: Number, default: 1 },
  computerLevel: { type: Number, default: 1 },
});

const User = mongoose.model("user", userSchema);

export default User;

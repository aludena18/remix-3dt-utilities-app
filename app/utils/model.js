import mongoose, { Schema } from "mongoose";

//DB Schemas
const command = new Schema({
  commandId: String,
  date: String,
  device: String,
  command: String,
  hexCommand: String,
});

const userSchema = new Schema({
  userId: String,
  userName: String,
  commands: [command],
});

//Models
// const User = mongoose.model("User", userSchema);
export const User = mongoose.models.User || mongoose.model("User", userSchema);

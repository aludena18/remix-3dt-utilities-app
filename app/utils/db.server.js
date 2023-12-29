import mongoose from "mongoose";
import { User } from "./model";

const DB_CLOUD_URI = process.env.CONNECTION_STRING;

//DB Config
const uri = DB_CLOUD_URI;
mongoose.set("strictQuery", false);
mongoose.connect(uri);

export const getUsers = async function () {
  const users = await User.find({});
  return users;
};

export const getUser = async function (userName) {
  const user = await User.findOne({ userName: userName });
  return user;
};

export const setCommandToUser = async function (userName, command) {
  const user = await User.findOne({ userName: userName });
  // console.log(user);
  user.commands.push(command);
  user.save();
};

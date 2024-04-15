/*
When working with typescript first define the types

Next Js is an edge time framework --> entire source code runs at edge time
*/

import mongoose, { Schema, Document } from "mongoose";

//1. create a new interface (type for the schema that we have created) --> only foe type safety
export interface Message extends Document {
  // extends document indicates that the message is a mangodb document type
  content: string;
  createdAt: Date;
}

//2.create schema
const messageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

//SIMILARLY FOR USER

//1. create tyescript interface
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: Message[];
}

//2.create schema
const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "UserName is required"],
    unique: true,
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    //Testing  a valid email
    match: [/.+\@.+\>.+/, "please provide valid email"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },

  verifyCode: {
    type: String,
    required: [true, "VerifyCode is required"],
  },

  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verify Code Expiry is required"],
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },

  //This the way we define an array of any type in mongoose -- [DATATYPE]
  messages: [messageSchema],
});

//Exporting
/*
Check if the schema already exists in the database
*/
const userModel =
  (mongoose.models.User as mongoose.Model<User>) || //if the schema already exists
  mongoose.model<User>("user", userSchema); // if schema does not exist create it

export default userModel;

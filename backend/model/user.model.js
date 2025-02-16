import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    lowecase: true,
    trim: true
  },
  password: {
    type: String,
    min: [6, 'Password must be  at least 6 character'],
    max: [12, 'Password not be grater than 12 character'],
    required: [true, "Password is required"],
  },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
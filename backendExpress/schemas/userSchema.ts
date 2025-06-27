import { Express } from "express";
import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const heightNweightSchma = new mongoose.Schema({
    height: {
        type: Number,
        required: true
    },
    weight: {
            type: Number, 
            required: true
        },
    goal:{
            type: String,
            enum:['Weight loss', 'Bulky build'],
            required: true
        }
       
    })


const userSchema =  new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    heightNweightSchma,
    profilePic: {
        type: String
    }

});

userSchema.pre('save', async function (next) {
    const user = this as any;
    if (!user.isModified('password')) return next();

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
  });

const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;


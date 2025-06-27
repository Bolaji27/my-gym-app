import mongoose from "mongoose";
import UserModel from "./userSchema";


const  mondaySchema = new mongoose.Schema({
    day: {
        type: String,
        required: true
    },
    workout: {
        type: String,
        required: true 
    },
    activity: {
        type: [String],
        default: []
    },
    note: {
        type: [String],
        default: []
    },
},  { timestamps: true });

const tuesdaySchema = new mongoose.Schema({
    day: {
        type: String,
        required: true
    },
    workout: {
        type: String,
        required: true 
    },
    activity: {
        type: [String],
        default: []
    },
    note: {
        type: [String],
        default: []
    },
}, { timestamps: true });

const wednesdaySchema = new mongoose.Schema({
    day: {
        type: String,
        required: true
    },
    workout: {
        type: String,
        required: true 
    },
    activity: {
        type: [String],
        default: []
    },
    note: {
        type:[String],
        default: []
    },
},  { timestamps: true });

const thursdaySchema = new mongoose.Schema({
    day: {
        type: String,
        required: true
    },
    workout: {
        type: [String],
        required: true 
    },
    activity: {
        type: [String],
        default: []
    },
    note: {
        type: [String],
        default: []
    },
},  { timestamps: true });

const fridaySchema = new mongoose.Schema({
    day: {
        type: String,
        required: true
    },
    workout: {
        type: String,
        required: true 
    },
    activity: {
        type: [String],
        default: []
    },
    note: {
        type: [String],
        default: []
    },
},  { timestamps: true });

const saturdaySchema = new mongoose.Schema({
    day: {
        type: String,
        required: true
    },
    workout: {
        type: String,
        required: true 
    },
    activity: {
        type: [String],
        default: []
    },
    note: {
        type: [String],
        default: []
    },
},  { timestamps: true });

const sundaySchema = new mongoose.Schema({
    day: {
        type: String,
        required: true
    },
    workout: {
        type: String,
        required: true 
    },
    activity: {
        type: [String],
        default: []
    },
    note: {
        type: [String],
        default: []
    },
},  { timestamps: true });


const routineSchema = new mongoose.Schema({
    mondaySchema,
    tuesdaySchema, 
    wednesdaySchema,
    thursdaySchema,
    fridaySchema,
    saturdaySchema,
    sundaySchema,
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "UserModel",
        required: true
    },
}, { timestamps: true });

const Routine = mongoose.model('Routine', routineSchema);

export default Routine;
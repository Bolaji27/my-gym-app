import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './Router/userRouter'
import router from './Router/routineRouter'



dotenv.config();
// import nodemon from 'nodemon'
const app = express();
app.use(express.json());
app.use("/api/user", userRouter);
app.use('/api/routine', router)


const mongodbConnectionString = process.env.MONGODB_URI

if (!mongodbConnectionString) {
  throw new Error("No connection string found");
}
mongoose.connect(mongodbConnectionString)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send("server is running and databse is connected")
});




app.listen(3000, "0.0.0.0", () => {
  console.log("Server is running on port 3000");
});


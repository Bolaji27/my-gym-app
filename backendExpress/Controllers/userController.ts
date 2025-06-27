import UserModel from "../schemas/userSchema";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import bcrypt from "bcrypt";

interface AuthRequest extends Request {
  userId?: string;
}

import { NextFunction, Request, Response } from "express";

export const saveUser = async (req: Request, res: Response): Promise<void> => {
  dotenv.config();
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({ message: "All form fields should be filled" });
      return;
    }

    const user = await UserModel.create({ firstName, lastName, email, password });
    const secret = process.env.JWT_SECRET!

    const token = jwt.sign({
      userId: user._id
    }, secret, { expiresIn: '7d' });

    res.status(200).json({ userId: user._id, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateUser = async (req: AuthRequest, res: Response): Promise<void> => {
  const { height, weight, goal } = req.body;
  const userId = req.userId

  if (!height || !weight || !goal) {
    res.status(400).json("Can't send request, data needs to be filled");
    return;
  }
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
      heightNweightSchma:
       {
          height,
          weight,
          goal
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json("User not found");
      return;
    }

    res.status(200).json({ message: "User updated", updatedUser });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went wrong");
    return;
  }
};



export const checkToken = async (req: AuthRequest, res: Response, next: NextFunction) => {

  try {
    const authToken = req.headers.authorization;
    if (!authToken || !authToken.startsWith('Bearer ')) {
       res.status(400).json('No token provided or malformed header');
       return;
    }
    const token = authToken?.split(' ')[1];
    if (!token) {
      res.status(400).json('no token headers attached');
      return;
    }
    const verifyTokenn = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    req.userId = verifyTokenn.userId
    next();
    return;
  } catch (error) {
    res.status(500).json("invalid token")
  }
}

export const updateUserPicture = async (req:AuthRequest, res:Response) : Promise<void> => {
  const {profilePic} = req.body;
  if(!profilePic) {
    res.status(400).json("no pic attached")
    return;
  }
  const userId = req.userId;
  try {
    const user = await UserModel.findByIdAndUpdate(userId, {profilePic});
    if(!user) {
      res.status(500).json("no user found");
      return;
    }
     res.status(200).json({message: 'picture updated'});
     console.log("profile pic :", user.profilePic);
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}


export const getUserInfo = async (req:AuthRequest, res:Response)=> {
    try {
  const userId = req.userId;
  if(!userId) {
    res.status(400).json('no token attached');
    return; 
  }
  const user = await UserModel.findById(userId).select("profilePic  heightNweightSchma.goal firstName");
  if(!user){
    res.status(400).json("no user found");
    return ;
  }
  res.status(200).json({
    profilePic:user.profilePic,
    goal:user.heightNweightSchma?.goal,
    name:user.firstName
  }); 
    } catch (error) {
      console.log('Error fetching user info');
      res.status(500).json({ message: 'Server error' });
    }
}

export const signin = async(req:Request, res:Response) => {
   const {email, password} = req.body;
   if(!email || !password) {
    res.status(400).json("incorrect email or password");
    return ;
   }

   try {
    const user =await UserModel.findOne({email});
    if(!user){
      res.status(400).json("user authentication failed");
      return ;
    }

    const comparePass = await bcrypt.compare(password, user.password);
    if(!comparePass){
      res.status(400).json("incorrect password or email");
      return;
    }

    const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET!, {
      expiresIn:"7d"
    });
    res.status(200).json({token})
   

   } catch (error) {
    console.log(error);
    res.status(500).json(`failed ${error}`)
   }
}
import Routine from "../schemas/rotuineSchema";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

interface AuthRequest extends Request {
    userId?: string;
}
export const saveWeeklyRoutine = async (req: AuthRequest, res: Response): Promise<void> => {
    const { mondaySchema, tuesdaySchema, wednesdaySchema, thursdaySchema, fridaySchema, saturdaySchema, sundaySchema } = req.body;
    if (!mondaySchema || !tuesdaySchema || !wednesdaySchema || !thursdaySchema || !fridaySchema || !saturdaySchema || !sundaySchema) {
        res.status(400).json({ message: "no day or workout filled" })
        return;
    }

    const userId = req.userId;
    if (!userId) {
        res.status(400).json({ message: "auth failed, no userId" })
        return;
    }
    try {
        const routine = await Routine.create({
            mondaySchema, tuesdaySchema, wednesdaySchema, thursdaySchema, fridaySchema, saturdaySchema, sundaySchema, userId
        });

        res.status(200).json("routine created");
    } catch (error) {
        res.status(500).json(error)
    }
}
export const updateRoutine = async (req:AuthRequest, res:Response) => {
  const {activity, note} = req.body;
  const userId = req.userId;
   if(!activity || !note) {
    res.status(400).json("provided activity or note")
    return ;
   }

   const days = ["sundaySchema","mondaySchema","tuesdaySchema","wednesdaySchema", "thursdaySchema", "fridaySchema", "saturdaySchema"];
   const today = new Date();
   const dayName = days[today.getDay()];
   console.log(dayName);
   const update = {
   [`${dayName}.activity`]: activity,
   [`${dayName}.note`]: note
   }
   try {
    const routine = await Routine.findOneAndUpdate({userId}, {$set:update});
   if(!routine) {
    res.status(400).json("cant find routine")
   }
   res.status(200).json("routine updated");
    
   } catch (error) {
    console.log(error)
   }
  
}

export const updateSchema = async (req:AuthRequest, res:Response) => {
  const {activity, note} = req.body;
  if(!activity || !note){
    res.status(400).json("please fill all info")
    return;
  }
  const userId = req.userId;
  if(!userId) {
    res.status(400).json("invalid userId")
  }
  try {
    const days = [ "sunday", "monday", 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const Day = new Date();
    const todaysDay = days[Day.getDay()];
   const todaySchema = `${todaysDay}Schema`;
   console.log(todaySchema)
   const update = {[`${todaySchema}.activity`]:activity,
   [`${todaySchema}.note`]:note }
   const routine = await Routine.findOneAndUpdate({userId}, {$set:update},{ new: true });
   if(!routine){
       res.status(400).json("cant find routine");
       return;
   }
   res.status(200).json('routine updated');
   return;
  } catch (error) {
    console.log(error);
    res.status(500).json( "Server error" );
    return ;
  }
}

export const getRoutineWorkout = async (req:AuthRequest, res:Response) =>{
   const userId = req.userId;
   try {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const date = new Date();
    const todaysDay = days[date.getDay()];
    const todayScheDay = `${todaysDay}Schema`

    const routine = await Routine.findOne({userId});
    if(!routine) {
        res.status(400).json("cant find Routine");
        return ;
    }
    const workout =(routine as Record<string, any>)[todayScheDay]?.workout;
   res.status(200).json({workout})
    return;
   } catch (error) {
    console.log(error);
    res.status(500).json(`network error ${error}`)
   }
}

export const GetAllWorkout = async(req:AuthRequest, res:Response) => {
  const userId = req.userId;
  if(!userId){
    res.status(400).json("user dont exist");
    return;
  }
  try {
    const routine = await Routine.findOne({userId:userId}).select("mondaySchema tuesdaySchema wednesdaySchema thursdaySchema fridaySchema saturdaySchema sundaySchema");
    if(!routine) {
        res.status(400).json("cant find routine");
        return ;
    }
    res.status(200).json({monday:routine.mondaySchema?.workout,
        tuesday:routine.tuesdaySchema?.workout,
        wednesday: routine.wednesdaySchema?.workout,
        thursday: routine.thursdaySchema?.workout,
        friday: routine.fridaySchema?.workout,
        saturday: routine.saturdaySchema?.workout,
        sunday: routine.sundaySchema?.workout
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
}

export const GetAllActivities =async (req:AuthRequest, res:Response) => {
    try {
        const day = ['sunday',"monday",'tuesday','wednesday','thursday','friday','saturday',];
        const newDay = new Date();
        const todaysDay = day[newDay.getDay()];
        const dayWithSchema =` ${todaysDay}Schema`;
        const userId = req.userId;
       
        const routine = await Routine.findOne({userId}).select({ [dayWithSchema.trim()]: 1, _id: 0 });
        if(!routine){
         res.status(400).json("authentication failed, cant find routine");
         return;
        }
        // const result = routine.toObject();
        // const dayData = (result as any)[dayWithSchema];

       
        res.status(200).json(routine)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

}

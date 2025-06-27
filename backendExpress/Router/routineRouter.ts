import express from 'express'
import { saveWeeklyRoutine, updateRoutine,updateSchema, getRoutineWorkout,GetAllWorkout,GetAllActivities} from '../Controllers/routineController';
import { checkToken } from '../Controllers/userController';

const router = express.Router();
router.post('/', checkToken,saveWeeklyRoutine);
router.patch('/updateRouter', checkToken,updateRoutine);
router.patch('/',checkToken,updateSchema);
router.get('/', checkToken, getRoutineWorkout);
router.get("/getWorkout", checkToken,GetAllWorkout);
router.get("/getAllRoutines",checkToken, GetAllActivities)

export default router;
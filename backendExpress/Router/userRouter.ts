import express from 'express'
import {saveUser, updateUser, checkToken, updateUserPicture, getUserInfo, signin} from "../Controllers/userController"
const router = express.Router();
router.get('/', checkToken, getUserInfo);
router.post('/', saveUser);
router.patch('/heightWeight',checkToken,updateUser);
router.patch('/profilePic', checkToken, updateUserPicture)
router.post("/signin",signin );
export default router
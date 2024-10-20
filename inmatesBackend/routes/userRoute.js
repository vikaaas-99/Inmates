import express from 'express'
import { loginUser, regesterUser, adminLogin } from '../controllers/userController.js'


const userRouter = express.Router();

userRouter.post('/register', regesterUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)

export default userRouter;
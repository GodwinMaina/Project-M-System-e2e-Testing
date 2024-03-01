import { Router } from "express";
import { userSignup } from "../controllers/signUpController";
import { userLogin } from "../controllers/authController";


const router = Router()

router.post('/signup', userSignup)

router.post('/auth/login', userLogin)



export default router;
import express from 'express';
const router = express.Router()
import {
    createUser,
    loginUser
} from '../controller/userCtrl.js';


router.post("/", createUser)
router.post("/login", loginUser)


export default router

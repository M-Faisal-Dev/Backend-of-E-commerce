import express from 'express';
import { authMiddleware,isAdmin } from '../middlewares/authMiddleware.js';
const router = express.Router()
import {
    createUser,
    loginUser,
    getAllUser,
    getSingleUser,
    deleteUser,
    updateUser,
    blockUser,
    unblockUser
} from '../controller/userCtrl.js';


router.post("/", createUser)
router.post("/login", loginUser)
router.get("/all-users", getAllUser)
router.get("/:id", authMiddleware,isAdmin, getSingleUser)
router.delete("/:id", deleteUser)
router.put("/edit-user",authMiddleware, updateUser)
router.put("/block-user/:id",authMiddleware, blockUser)
router.put("/unblock-user/:id",authMiddleware, unblockUser)


export default router

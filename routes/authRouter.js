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
    unblockUser,
    handleRefreshToken,
    handleLogout,
    updatePassword,
    forgetPasswordToken,
    resetPassword
} from '../controller/userCtrl.js';


router.post("/", createUser)
router.post("/login", loginUser)
router.get("/all-users", getAllUser)
router.get("/refresh", handleRefreshToken)
router.get("/logout", handleLogout)
router.delete("/:id", deleteUser)
router.post("/forget-password",forgetPasswordToken)
router.put("/reset-password/:token", resetPassword)
router.put("/password/",authMiddleware, updatePassword)
router.put("/edit-user",authMiddleware, updateUser)
router.get("/:id", authMiddleware,isAdmin, getSingleUser)
router.put("/block-user/:id",authMiddleware,isAdmin, blockUser)
router.put("/unblock-user/:id",authMiddleware,isAdmin, unblockUser)


export default router

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
    handleLogout
} from '../controller/userCtrl.js';


router.post("/", createUser)
router.post("/login", loginUser)
router.get("/all-users", getAllUser)
router.get("/refresh", handleRefreshToken)
router.get("/logout", handleLogout)
router.get("/:id", authMiddleware,isAdmin, getSingleUser)
router.delete("/:id", deleteUser)
router.put("/edit-user",authMiddleware, updateUser)
router.put("/block-user/:id",authMiddleware,isAdmin, blockUser)
router.put("/unblock-user/:id",authMiddleware,isAdmin, unblockUser)


export default router

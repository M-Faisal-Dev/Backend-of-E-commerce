import express from 'express';
import { authMiddleware,isAdmin } from '../middlewares/authMiddleware.js';
const router = express.Router()

import {
    createBlog,
    getSingleBlog,
    getAllBlog,
    updateBlog,
    deleteBlog,
    likeBlog,
    dislikeBlog
} from '../controller/blogCtrl.js'




router.get('/',getAllBlog)
router.get('/:id',getSingleBlog)

router.put('/likes',authMiddleware,likeBlog)
router.put('/dislikes',authMiddleware,dislikeBlog)
router.post('/',authMiddleware,isAdmin,createBlog)
router.put('/:id',authMiddleware,isAdmin,updateBlog)
router.delete('/:id',authMiddleware,isAdmin,deleteBlog)






export default router
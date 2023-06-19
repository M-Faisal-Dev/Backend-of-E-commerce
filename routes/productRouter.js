import express from 'express';
import { authMiddleware,isAdmin } from '../middlewares/authMiddleware.js';
const router = express.Router()

import {
    createProduct,
    getSingleProduct,
    getAllProduct,
    updateProduct,
    deleteProduct
} from '../controller/productCtrl.js'



router.post('/',authMiddleware,isAdmin, createProduct)
router.get('/', getAllProduct)
router.get('/:id', getSingleProduct)
router.put('/:id',authMiddleware,isAdmin, updateProduct)
router.delete('/:id',authMiddleware,isAdmin, deleteProduct)






export default router
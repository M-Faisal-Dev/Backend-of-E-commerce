import express from 'express';
import { authMiddleware,isAdmin } from '../middlewares/authMiddleware.js';
const router = express.Router()

import {
    createProduct,
    getSingleProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    addToWishList,
    addRating,
    uploadImgs,
} from '../controller/productCtrl.js'
import { uploadPhoto, productImgResize } from '../middlewares/uploadImgs.js';



router.post('/',authMiddleware,isAdmin, createProduct)
router.get('/', getAllProduct)
router.get('/:id', getSingleProduct)
router.put('/wishlist',authMiddleware,isAdmin, addToWishList)
router.put('/rating',authMiddleware, addRating)
router.put('/:id',authMiddleware,isAdmin, updateProduct)
router.put('/upload-imgs/:id',authMiddleware,isAdmin, uploadPhoto.array('images',10),productImgResize, uploadImgs)
router.delete('/:id',authMiddleware,isAdmin, deleteProduct)






export default router
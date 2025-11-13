import express from 'express'
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { getCategories, post_category, post_image_product, post_product, post_subCategory, put_product } from '../controller/post.products.js';
import { put_order } from '../controller/post.order.js';

const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder: 'profile_imgs',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }
})
 const parser=multer({storage:storage})

 const router=express.Router()

router.post('/post_category',post_category)
router.post('/post_subcategory',post_subCategory)
router.post('/post_product',post_product)
router.post('/post_image_product',parser.single('image'),post_image_product)
router.put('/put_order/:id',put_order)
router.get('/get_category',getCategories)
router.put('/put_product/:id',put_product)


export default router



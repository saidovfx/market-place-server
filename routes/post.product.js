import express from 'express'
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import {
  getCategories,
  getProducts,
  post_category,
  post_image_product,
  post_product,
  post_subCategory,
  put_product,
  delete_image_product
} from '../controller/post.products.js';

import { put_order } from '../controller/post.order.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products_image',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
  }
});

const parser = multer({ storage: storage });

const router = express.Router();

// CATEGORY
router.post('/category', post_category);
router.get('/category', getCategories);

// SUBCATEGORY
router.post('/subcategory', post_subCategory);

// PRODUCT CRUD
router.post('/product', post_product);
router.get('/product', getProducts);
router.put('/product/:id', put_product);

// PRODUCT IMAGES
router.post('/product/image', parser.single('image'), post_image_product);
router.delete('/product/image', delete_image_product);

// ORDERS
router.put('/order/:id', put_order);

export default router;

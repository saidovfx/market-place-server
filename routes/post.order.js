import express from "express";
const router=express.Router()
import { post_order } from "../controller/post.order.js";
import authenTokenCheck from "../middlware/authenTokenCheck.js";
import { checkOrderArray } from "../middlware/checkOrderArray.js";


router.use(authenTokenCheck)
router.post('/send-order',checkOrderArray,post_order)

export default router

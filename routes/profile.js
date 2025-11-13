import express from "express";
const router=express.Router()
import {renameUserInfo,renameAdress,deleteAddress} from '../controller/profile-controller.js'

import authenTokenCheck from "../middlware/authenTokenCheck.js";

router.use(authenTokenCheck)
router.put('/rename-user-info/:id',renameUserInfo)
router.put("/rename-address/:id/:addressID",renameAdress)
router.delete("/delete-address/:id/:addressID",deleteAddress)

export default router

import jwt from "jsonwebtoken"
import ENV from "../lib/ENV.js"
const authenTokenCheck=async(req,res,next)=>{
    try {
        const token=req.cookies.marketToken    
        if(!token)
            return res.status(404).json({warning:"Token is not exists"})


        jwt.verify(token,ENV.JWT_SECRET,(err,user)=>{
            if(err)
                return res.status(403).json({warning:"Token is modified"})
            req.user=user
            next()
        })
    } catch (error) {
           console.log("Error ocured while  checking token"+error.message)
        res.status(500).json({error:"Internal server error"})
    }
}

export default authenTokenCheck
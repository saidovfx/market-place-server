import User from "../models/User.js"
import Order from "../models/Order.js"



export const post_order=async(req,res)=>{
    const userId=req.user.id
    const updatedOrderArray=req.order
    const totalPrice=req.totalPrice
    const {fullname,desc,address,phone,email,expressDilevery}=req.body

    if(!userId){
        return res.status(400).json({warning:'User id is not defind'})

    }

    if(!fullname || !address || !phone || !updatedOrderArray){
        return res.status(400).json({warning:'All required field have to be full'})
    }
    try {
        const user=await User.findById(userId)
        if(!user) {
            return res.status(404).json({warning:'User not found'})
        }
         
    await Order.create({userId,fullname,desc,address,phone,email,orderArray:updatedOrderArray,totalPrice,expressDilevery})
    res.status(200).json({success:'We will Ozodbek very soon'})
    } catch (error) {
     console.log("Error ocured while sending order ",
      error.status,
      error.message
);
return res.status(500).json({error:'Internal server error'})
        
    }
}


export const put_order=async(req,res)=>{
    try {
        const orderId=req.params.id
         const updatedOrderArray=req.order
         const totalPrice=req.totalPrice
         const {fullname,desc,address,phone,email,acceptStatus,progressStatus,recievedStatus}=req.body 
       if(!orderId){
        return res.status(400).json({warning:'All required field have to be full'})
       }

    const order=await Order.findById(orderId)
     if(!orderId){
      return res.status(404).json({warning:'Order not found'})
     }

     order.updateOne({orderArray:updatedOrderArray,totalPrice,fullname,desc,address,phone,email,acceptStatus,progressStatus,recievedStatus})
     await order.save()
    } catch (error) {

     console.log("Error ocured while putting order ",
      error.status,
      error.message
     );
      return res.status(500).json({error:'Internal server error'})
        
    }
    }




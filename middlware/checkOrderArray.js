   
import Product from "../models/Procuts.js"

   export const checkOrderArray=async(req,res,next)=>{
    try{
        const {orderArray}=req.body 
        console.log(orderArray);
        
      if(!Array.isArray(orderArray) || orderArray.length===0){
      return res.status(400).json({warning:'orderArray is not have to be null'})
    }
     const productsId=orderArray.map((product)=>product.productId)
     const products= await Product.find({_id:{$in:productsId}})
     if(products.length!==productsId.length){
        const existingProducts=products.map((p)=>p._id.toString())
        const missingProduct=productsId.filter((id)=>!existingProducts.includes(id.toString()))
        return res.status(404).json({
            warning:'Some products are missing',
            missingProduct
        })
     }
const updatedOrderArray=[]
let totalPrice=0
   for(const item of orderArray ){

        const product=products.find((p)=> p._id.toString()===item.productId.toString())
        const overAllPrice=product.price * item.count
        const leftShotuk=product.shotuk-item.count
        product.shotuk=leftShotuk

        if(leftShotuk<0){
         return res.status(400).json({warning:`Product shotuk is not enougth ${product.name} `})
        }
          
        await product.save()

        updatedOrderArray.push({
         productsId:item.productId,
         count:item.count,
          overAllPrice
        })
        totalPrice+=overAllPrice
   }


     

   
    

   
  
     req.order=updatedOrderArray
     req.totalPrice=totalPrice

     next()

    }catch(error){
    console.error("checkOrderArray error:", error);
    res.status(500).json({ message: "Server internal error", error: error.message });
    }
   }


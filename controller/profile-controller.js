import User from "../models/User.js"
import  mongoose from "mongoose"
import isValidObjectId from "../lib/checkIsValidId.js"
 export const renameUserInfo=async(req,res)=>{
 const userID=req.user._id
    if(!isValidObjectId(userID)) return res.status(400).json({warning:"User is not valid"})

    try {
        const {firstname,lastname,age,phone,email}=req.body

        const user=await User.findById(userID)

        if(!user) return res.status(404).json({warning:"User is not exist"})
        let updateFields={}
        if(firstname && firstname!==user.firstname) {
            updateFields.firstname=firstname
        }    
        if(lastname && lastname!==user.lastname) updateFields.lastname=lastname
        if(age && age!== user.age) updateFields.age=age
        if(phone&& phone.startsWith('+992') && phone.length==13 && phone!==user.phone) updateFields.phone=phone 
        if(email && email!==user.email) updateFields.email=email
        if(Object.keys(updateFields).length===0) return res.status(200).json({warning:'Nothing to update'})
         await User.findByIdAndUpdate(userID,updateFields,{new:true})
        res.status(200).json({message:"User information updated"})
    } catch (error) {
        console.log("Error ocured while updating the user"+error.message)
        res.status(500).json({error:"Internal server error"})
    }
}




  export const addNewAddress=async(req,res)=>{
try {
    const userID = req.user._id

    if(!isValidObjectId(userID)) return res.status(401).json({warning:"Id is not valid"})

     const {address,additionalComment}=req.body

     const user=await User.findById(userID)
      
     if(!user) return res.status(404).json({warning:"User is not found"})
       
    if(!address.length<15 || !address)  return res.status(400).json({warning:"Address is not full  "})

      user.address.push({address,additionalComment})
    await    user.save()
res.status(200).json({success:"Address added successfully"})
} catch (error) {
   console.log("Error ocured while adding addresss the user"+error.message)
        res.status(500).json({error:"Internal server error"})
    
}
}




 export const renameAdress=async(req,res)=>{
    try {
const userID=req.user._id
  const addressID =req.params.addressId

    if(!isValidObjectId(userID)) return res.status(401).json({warning:"Id is not valid"})

        if(!addressID)
            return res.status(400).json({warning:'Address id is not defind'})

     const {address,additionalComment}=req.body

     const user=await User.findById(userID)
      
     if(!user) return res.status(404).json({warning:"User is not found"})
       
    if(!address|| !address.length<15)  return res.status(400).json({warning:"Address is not full  "})

        const targetAdress=user.address.id(addressID)

        if(!targetAdress) 
            return res.status(404).json({warning:"User address is not found"})
      targetAdress.address=address
targetAdress.additionalComment=additionalComment      
         await user.save()
res.status(200).json({success:"Address renamed successfully"})
    } catch (error) {
           console.log("Error ocured while renaming addresss the user"+error.message)
        res.status(500).json({error:"Internal server error"})
    }
}



 export const deleteAddress=async(req,res)=>{
    try {
      const userID = req.user._id
  const addressID =req.params.addressId

    if(!isValidObjectId(userID)) return res.status(401).json({warning:"Id is not valid"})

        if(!addressID)
            return res.status(400).json({warning:'Address id is not defind'})

        const user=await User.findById(userID)
        if(!user)
             return  res.status(404).json({warning:"User is not found"})

        const targetAdress=user.address.id(addressID)

        if(!targetAdress)
            return res.status(404).json({warning:"User address is not found"})

targetAdress.deleteOne()
 await user.save()
res.status(200).json({success:"Address deleted successfully"})
       
    } catch (error) {
               console.log("Error ocured while deleting addresss the user"+error.message)
        res.status(500).json({error:"Internal server error"})
    }
}


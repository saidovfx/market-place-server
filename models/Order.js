import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
    fullname:{type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'marketUsers',required:true},
    phone:{type:String,required:true,},
    email:{type:String},
    address:{type:String,required:true},
    desc:{type:String},
    expressDilevery:{type:Boolean,default:false},
    acceptStatus:{type:Boolean,default:false},
    progressStatus:{type:Boolean,default:false},
    recievedStatus:{type:Boolean,default:false},
    totalPrice:{type:Number,required:true},
    cancelStatus:{type:Boolean,default:false},
      orderArray:[
        {
            productId:{type:mongoose.Schema.Types.ObjectId, ref:'products'},
            count: { type: Number, required: true, min: 1 },
            overAllPrice:{type:Number}
        }
      ]
},  { timestamps: true })

export default  mongoose.model('orders',orderSchema)

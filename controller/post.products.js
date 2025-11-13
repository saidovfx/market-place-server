import Category from "../models/Category.js";
import Subcategory from "../models/SubCategory.js";
import Product from "../models/Procuts.js";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";


const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder: 'profile_imgs',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }
})
 const parser=multer({storage:storage})


export const post_category=async(req,res)=>{
   try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Missing fields" });
    const category = new Category({ name });
    await category.save();
    
    res.status(201).json({ message: "Category created", category });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export const post_subCategory=async(req,res)=>{
      try {
    const { name, categoryId } = req.body;
    if (!name || !categoryId)
      return res.status(400).json({ error: "Missing fields" });

    const category = await Category.findById(categoryId);
    if (!category) return res.status(400).json({ error: "Category not found" });


    const subcat = new Subcategory({ name, categoryId });
    await subcat.save();
    category.subcategories.push(subcat._id);
    await category.save();
    res
      .status(201)
      .json({ message: "Subcategory created", subcategory: subcat });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export const post_product=async(req,res)=>{
try{
    const { name, price, categoryId, subcategoryId,desc } = req.body;


    if (!name || !price || !categoryId || !subcategoryId)
      return res.status(400).json({ error: "Missing fields" });

    const category = await Category.findById(categoryId);
    if (!category) return res.status(400).json({ error: "Category not found" });

    const subcategory = await Subcategory.findById(subcategoryId);
    if (!subcategory)
      return res.status(400).json({ error: "Subcategory not found" });


    const product = new Product({ name, price, categoryId, subcategoryId ,desc});
    await product.save();
    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


export  const post_image_product=async(req,res)=>{
    try {
        const imageUrl=req.file.path
        const {productId,isMain}=req.body
        if(!imageUrl || !productId){
            return res.status(400).json({warining:'Missing fields'})

        }

        const product=await Product.findById(productId)
        if(!product){
            return res.status(404).json({warning:'Product not found'})

        }

        const result=await cloudinary.uploader.upload(imageUrl,{
            folder:'products_image'
        })

        

        product.images.push({imageUrl:result.secure_url,imageID:result.public_id,isMain})

        await product.save()

        res.status(200).json({success:'Image uploaded'})



    } catch (error) {
        console.log("Error ocured while uploading image",error.message);
        return res.status(500).json({error:'Server internal error'})
        
    }
}


export const delete_image_product=async(req,res)=>{
    try {
        const {imageId,productId}=req.body
        if(!imageId || !productId){
            return res.status(400).json({warning:"Missing fields"})
        }
          const product=await Product.findById(productId)

         if(!product){
                return res.status(404).json({warning:'Product not found'})
         }

          const image=product.images.filter((item)=>item.imageID!==imageId)

          product.images=image


         await product.save()
          res.status(200).json({success:'Product image deleted successfully'})
                 

        
    } catch (error) {
         console.log("Error ocured while deleting image",error.message)
         return res.status(500).json({
            error:'Internal server error'
         })
    }
}



export const put_product=async(req,res)=>{
  try {
    const productId=req.params.id
    const {name,desc,subcategoryId,categoryId,price,shotuk}=req.body
  
      const product=await Product.findById(productId)
      if(!product){
        return res.status(404).json({warning:'Product not found'})
      }

 
      let update=false
       if( name && product.name.trim()!==name.trim()) product.name=name, update=true
       if(desc && product.desc.trim()!==desc.trim()) product.desc=desc, update=true
       if(subcategoryId && product.subcategoryId!==categoryId.trim().toString()) product.subcategoryId=subcategoryId ,update=true
       if(categoryId && product.categoryId!==categoryId.trim().toString()) product.categoryId=categoryId, update=true
       if(price && product.price!==price) product.price=price, update=true
       if(shotuk && product.shotuk!==shotuk) product.shotuk=shotuk, update=true


       if(!update) return res.status(304).json({warning:'Nothing to update '})
        await product.save()
       res.status(200).json({success:"Product updated successfully"})




       
   

  } catch (error) {
    console.log("Error ocured while updating product",error.message);
    return res.status(500).json({error:"Internal server error"})
    
  }
}


export const getCategories = async (req, res) => {
  const categories = await Category.find().populate("subcategories");
  res.json(categories);
};

export const getProducts = async (req, res) => {
  const products = await Product.find()
    .populate("categoryId")
    .populate("subcategoryId");
  res.json(products);
};




const category = require('../models/category')


const createCategory = async(req,res)=>{
       console.log(req.body);
    try{
        
        const {name, slug} = req.body

        const newCategory = await category.create({
            name,
            slug
        })

        res.status(201).json({
            success: true,
      data: newCategory,
        })
    }catch(error){
        res.status(500).json({
             success: false,
      message: error.message,
        })
    }
}


const getCategory = async (req,res)=>{
    
    try{
        
        const categories = await category.find().sort({createdAt: -1})

        res.status(200).json({
             success: true,
            count: categories.length,
            data: categories
        })
    }catch(error){
        res.status(500).json({
               success: false,
            message: error.message
        })
    }
}

module.exports = {createCategory, getCategory}
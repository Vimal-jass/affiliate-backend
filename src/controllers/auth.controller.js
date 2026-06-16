const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const admin = require('../models/admin')

const authRegister =  async (req,res) =>{
    try{
        const {name, email, password} = req.body
        const isEmail = await admin.findOne({
            email
        })

        if(isEmail){
            return res.status(400).json({
                success: false,
                message: "user already register"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await admin.create({
            name,
            email,
            password : hashPassword
        })

        return res.status(201).json({
            success:true,
            message: "user created successfully",
            user
        })
        
    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const authLogin = async (req,res)=>{
try{
        const {email, password} = req.body

    const isEmail = await admin.findOne({
        email
    })

    if(!isEmail){
        return res.status(400).json({
            success:false,
            message:"please register before login"
        })
    }

    const isMatch = await bcrypt.compare(password, isEmail.password)

    const token = await jwt.sign({
        adminId : admin._id
    }, process.env.JWT_TOKEN, {
        expiresIn: '7d'
    })

    return res.status(200).json({
        success:true,
        message:'user logged in',
        token,
        email,
        password
    })
}catch(error){
    return res.status(400).json({
        success:false,
        message: error.message
    })
}
}



module.exports = 
{
    authRegister,
    authLogin
}
const jwt = require('jsonwebtoken')
const auth = async (req,res, next)=>{
    try{
        const token = req.headers.authorization?.split(' ')[1]

        console.log("Authorization:", req.headers.authorization);
console.log("Token:", token);

         if(!token){
        return res.status(401).json({
            success:false,
            message: "access denied"
        })
    }

    console.log("JWT Secret:", process.env.JWT_TOKEN);

    const decoded = jwt.verify(
        token, 
        process.env.JWT_TOKEN
    )

    req.admin = decoded;


    next()

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
   
}

module.exports = {auth}
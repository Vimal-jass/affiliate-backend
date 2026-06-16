const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },

    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },

    logo:{
        type:String,
        default:null
    },

    affiliateUrl:{
        type:String,
        default:null
    },

    clicks:{
    type:Number,
    default:0
},

    featured:{
        type:Boolean,
        default:false
    },

    active:{
        type:Boolean,
        default:true
    }

},{timestamps:true})

module.exports = mongoose.model('Store',storeSchema)
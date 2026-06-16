const Deal = require('../models/deal');
const Store = require('../models/store');
const Category = require('../models/category');

const getHomeData = async (req,res)=>{
    try{

        const featuredDeals = await Deal.find({
            featured:true
        })
        .limit(10)
        .populate('store','name slug logo');

        const latestDeals = await Deal.find()
        .sort({createdAt:-1})
        .limit(10)
        .populate('store','name slug logo');

        const topStores = await Store.find()
        .sort({clicks:-1})
        .limit(10);

        const categories = await Category.find()
        .limit(20);

        res.status(200).json({
            success:true,
            data:{
                featuredDeals,
                latestDeals,
                topStores,
                categories
            }
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }
}

module.exports = {
    getHomeData
}
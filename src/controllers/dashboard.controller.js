const Deal = require('../models/deal');
const Store = require('../models/store');
const Category = require('../models/category');

const getDashboardStats = async(req,res)=>{
    try{

        const totalDeals = await Deal.countDocuments();

        const totalStores = await Store.countDocuments();

        const totalCategories = await Category.countDocuments();

        const dealClicks = await Deal.aggregate([
            {
                $group:{
                    _id:null,
                    total:{
                        $sum:'$clicks'
                    }
                }
            }
        ]);

        const storeClicks = await Store.aggregate([
            {
                $group:{
                    _id:null,
                    total:{
                        $sum:'$clicks'
                    }
                }
            }
        ]);

        const topDeals = await Deal.find()
        .sort({clicks:-1})
        .limit(5)
        .select('title clicks');

        const topStores = await Store.find()
        .sort({clicks:-1})
        .limit(5)
        .select('name clicks');

        res.status(200).json({
            success:true,
            data:{
                totalDeals,
                totalStores,
                totalCategories,
                totalDealClicks:
                    dealClicks[0]?.total || 0,
                totalStoreClicks:
                    storeClicks[0]?.total || 0,
                topDeals,
                topStores
            }
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }
};

const updateDeal = async(req,res)=>{
    try{

        const deal = await Deal.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument:'after',
                runValidators:true
            }
        );

        if(!deal){
            return res.status(404).json({
                success:false,
                message:'Deal not found'
            });
        }

        res.status(200).json({
            success:true,
            data:deal
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }
};


const deleteDeal = async(req,res)=>{
    try{

        const deal = await Deal.findByIdAndDelete(
            req.params.id
        );

        if(!deal){
            return res.status(404).json({
                success:false,
                message:'Deal not found'
            });
        }

        res.status(200).json({
            success:true,
            message:'Deal deleted successfully'
        });

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }
};

module.exports = {
    getDashboardStats,
    updateDeal,
    deleteDeal
};
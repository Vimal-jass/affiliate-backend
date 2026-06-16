const Store = require('../models/store')

const createStore = async(req,res)=>{
    try{

        const {name,slug,logo,affiliateUrl} = req.body

        const store = await Store.create({
            name,
            slug,
            logo,
            affiliateUrl
        })

        res.status(201).json({
            success:true,
            data:store
        })

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        })

    }
}

const getStores = async (req, res) => {
    try {

        const stores = await Store.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: stores.length,
            data: stores
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


const trackStoreClick = async(req,res)=>{
    try{

        const store = await Store.findByIdAndUpdate(
            req.params.id,
            {
                $inc:{
                    clicks:1
                }
            },
            {
                new:true
            }
        );

        if(!store){
            return res.status(404).json({
                success:false,
                message:'Store not found'
            });
        }

        return res.redirect(store.affiliateUrl);

    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }
}


module.exports = {
    createStore,
    getStores,
    trackStoreClick
}
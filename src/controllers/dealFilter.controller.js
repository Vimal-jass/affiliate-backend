const Deal = require('../models/deal');
const Category = require('../models/category');
const Store = require('../models/store');

const getFilteredDeals = async (req, res) => {
    try {

        const {
            category,
            store,
            featured,
            search,
            page = 1,
            limit = 20,
            sort
        } = req.query;

        let filter = {};

        let sortOption = {
            createdAt: -1
        };

        // Sort Logic
        if (sort === 'latest') {
            sortOption = {
                createdAt: -1
            };
        }

        if (sort === 'price-low') {
            sortOption = {
                price: 1
            };
        }

        if (sort === 'price-high') {
            sortOption = {
                price: -1
            };
        }

        // Featured Filter
        if (featured) {
            filter.featured = featured === 'true';
        }

        // Search Filter
        if (search) {
            filter.title = {
                $regex: search,
                $options: 'i'
            };
        }

        // Category Filter
        if (category) {

            const categoryDoc = await Category.findOne({
                slug: category
            });

            if (!categoryDoc) {
                return res.status(200).json({
                    success: true,
                    count: 0,
                    data: []
                });
            }

            filter.category = categoryDoc._id;
        }

        // Store Filter
        if (store) {

            const storeDoc = await Store.findOne({
                slug: store
            });

            if (!storeDoc) {
                return res.status(200).json({
                    success: true,
                    count: 0,
                    data: []
                });
            }

            filter.store = storeDoc._id;
        }

        const currentPage = Number(page);
        const currentLimit = Number(limit);

        const skip = (currentPage - 1) * currentLimit;

        const deals = await Deal.find(filter)
            .populate('category', 'name slug')
            .populate('store', 'name slug logo')
            .sort(sortOption)
            .skip(skip)
            .limit(currentLimit);

        const totalDeals = await Deal.countDocuments(filter);

        res.status(200).json({
            success: true,
            totalDeals,
            currentPage,
            totalPages: Math.ceil(totalDeals / currentLimit),
            count: deals.length,
            data: deals
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    getFilteredDeals
};
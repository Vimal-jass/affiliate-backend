const Deal = require('../models/deal');

const createDeal = async (req, res) => {
    try {

        const deal = await Deal.create(req.body);

        res.status(201).json({
            success: true,
            data: deal
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


const getDeals = async (req, res) => {
  try {

    const { category, store, featured, search } = req.query;

    let filter = {};

    // 🔥 featured filter
    if (featured) {
      filter.featured = featured === 'true';
    }

    // 🔥 search filter
    if (search) {
      filter.title = {
        $regex: search,
        $options: "i"
      };
    }

    // 🔥 NOW USING FILTER 👇
    const deals = await Deal.find(filter)
      .populate('category', 'name slug')
      .populate('store', 'name slug logo')
      .sort({ createdAt: -1 });

    let filteredDeals = deals;

    // extra JS filtering
    if (category) {
      filteredDeals = filteredDeals.filter(
        deal => deal.category?.slug === category
      );
    }

    if (store) {
      filteredDeals = filteredDeals.filter(
        deal => deal.store?.slug === store
      );
    }

    res.status(200).json({
      success: true,
      count: filteredDeals.length,
      data: filteredDeals
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const getDealById = async (req, res) => {
    try {

        const deal = await Deal.findById(req.params.id)
            .populate('category', 'name slug')
            .populate('store', 'name slug logo');

        if (!deal) {
            return res.status(404).json({
                success: false,
                message: 'Deal not found'
            });
        }

        res.status(200).json({
            success: true,
            data: deal
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


const redirectDeal = async (req, res) => {
    try {

        const deal = await Deal.findById(req.params.id);

        if (!deal) {
            return res.status(404).json({
                success: false,
                message: "Deal not found"
            });
        }

        deal.clicks += 1;

        await deal.save();

        return res.redirect(deal.affiliateLink);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    createDeal,
    getDeals,
    getDealById,
    redirectDeal
};


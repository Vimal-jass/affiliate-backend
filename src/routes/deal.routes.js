const express = require('express');

const router = express.Router();

const controller = require('../controllers/deal.controller');
const filterController = require('../controllers/dealFilter.controller');

router.post('/deals', controller.createDeal);

router.get('/deals/filter', filterController.getFilteredDeals);

router.get('/deals', controller.getDeals);

router.get('/deals/:id', controller.getDealById);

router.get('/go/:id', controller.redirectDeal);

module.exports = router;
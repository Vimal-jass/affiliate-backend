const express = require('express')

const router = express.Router()

const storeController = require('../controllers/store.controller')

router.post('/stores',storeController.createStore)
router.get('/stores', storeController.getStores);
router.get('/stores/go/:id', storeController.trackStoreClick);

module.exports = router
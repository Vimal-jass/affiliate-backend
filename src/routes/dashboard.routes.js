const express = require('express')
const router = express.Router()
const getDashboard = require('../controllers/dashboard.controller');
const { get } = require('../app');
const { auth } = require('../middlewares/auth.middleware');


router.get('/dashboard',auth, getDashboard.getDashboardStats);
router.put('/deals/:id', auth, getDashboard.updateDeal);
router.delete('/deals/:id', auth, getDashboard.deleteDeal);

module.exports = router
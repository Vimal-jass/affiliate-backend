const express = require('express')

const route = express.Router()

const controller = require('../controllers/category.controller')


route.post('/categories', controller.createCategory)
route.get('/categories', controller.getCategory)


module.exports = route
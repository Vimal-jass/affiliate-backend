const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        default: ""
    },

    image: {
        type: String,
        default: null
    },

    price: {
        type: Number,
        required: true
    },

    originalPrice: {
        type: Number,
        default: 0
    },

    affiliateLink: {
        type: String,
        required: true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    },

    clicks: {
        type: Number,
        default: 0
    },

    featured: {
        type: Boolean,
        default: false
    },

    active: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

module.exports = mongoose.model('Deal', dealSchema);
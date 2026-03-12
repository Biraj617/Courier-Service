const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

// @route   POST /api/users/parcels
// @desc    Create a new parcel
// @access  Private (User, Admin, Wholesaler)
router.post('/parcels', protect, userController.createParcel);

// @route   GET /api/users/parcels/history
// @desc    Get all parcels sent by the logged-in user
// @access  Private (User, Wholesaler)
router.get('/parcels/history', protect, userController.getUserParcels);

// @route   GET /api/users/parcels/track/:trackingNumber
// @desc    Track a specific parcel (Publicly accessible usually, or restricted if sensitive info)
// @access  Public
router.get('/parcels/track/:trackingNumber', userController.trackParcel);

module.exports = router;

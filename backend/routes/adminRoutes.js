const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All routes here require Admin or SuperAdmin access
router.use(protect);
router.use(authorize('Admin', 'SuperAdmin'));

// @route   GET /api/admin/parcels
router.get('/parcels', adminController.getAllParcels);

// @route   PUT /api/admin/parcels/:parcelId/assign
router.put('/parcels/:parcelId/assign', adminController.assignDelivery);

// @route   PUT /api/admin/parcels/:parcelId/status
router.put('/parcels/:parcelId/status', adminController.updateParcelStatus);

// @route   PUT /api/admin/payments/:paymentId/verify
router.put('/payments/:paymentId/verify', adminController.verifyPayment);

module.exports = router;

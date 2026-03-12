const express = require('express');
const router = express.Router();
const superAdminController = require('../controllers/superAdminController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All routes here require SuperAdmin access
router.use(protect);
router.use(authorize('SuperAdmin'));

// @route   GET /api/superadmin/analytics
router.get('/analytics', superAdminController.getAnalytics);

// @route   GET /api/superadmin/users
router.get('/users', superAdminController.getAllUsers);

// @route   PUT /api/superadmin/users/:userId/role
router.put('/users/:userId/role', superAdminController.changeUserRole);

module.exports = router;

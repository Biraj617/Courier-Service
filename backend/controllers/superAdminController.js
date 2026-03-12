const db = require('../models');

const User = db.User;
const Role = db.Role;
const Payment = db.Payment;
const Parcel = db.Parcel;

// @desc    Get system analytics
exports.getAnalytics = async (req, res) => {
    try {
        const totalUsers = await User.count();
        const totalParcels = await Parcel.count();
        const totalRevenueResult = await Payment.sum('amount', { where: { status: 'Completed' } });
        const totalRevenue = totalRevenueResult || 0;

        res.json({
            totalUsers,
            totalParcels,
            totalRevenue
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching analytics' });
    }
};

// @desc    Get all users (for management)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{ model: Role, attributes: ['name'] }]
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching users' });
    }
};

// @desc    Change user role (e.g., promote to Admin)
exports.changeUserRole = async (req, res) => {
    try {
        const { userId } = req.params;
        const { roleName } = req.body;

        const role = await Role.findOne({ where: { name: roleName } });
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.roleId = role.id;
        await user.save();

        res.json({ message: `User promoted to ${roleName}`, user });
    } catch (error) {
        res.status(500).json({ message: 'Server Error changing role' });
    }
};

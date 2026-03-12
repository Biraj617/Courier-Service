const db = require('../models');

const Parcel = db.Parcel;
const ParcelStatus = db.ParcelStatus;
const Payment = db.Payment;
const User = db.User;
const Role = db.Role;

// @desc    Get all parcels (for dashboard)
exports.getAllParcels = async (req, res) => {
    try {
        const parcels = await Parcel.findAll({
            include: [
                { model: User, as: 'Sender', attributes: ['firstName', 'lastName'] },
                { model: User, as: 'AssignedStaff', attributes: ['firstName', 'lastName'] }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json(parcels);
    } catch (error) {
        res.status(500).json({ message: 'Server Error fetching parcels' });
    }
};

// @desc    Assign delivery staff to a parcel
exports.assignDelivery = async (req, res) => {
    try {
        const { parcelId } = req.params;
        const { staffId } = req.body;

        const parcel = await Parcel.findByPk(parcelId);
        if (!parcel) {
            return res.status(404).json({ message: 'Parcel not found' });
        }

        parcel.assignedStaffId = staffId;
        await parcel.save();

        res.json({ message: 'Delivery staff assigned successfully', parcel });
    } catch (error) {
        res.status(500).json({ message: 'Server Error assigning staff' });
    }
};

// @desc    Update parcel status
exports.updateParcelStatus = async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
        const { parcelId } = req.params;
        const { status, location, notes } = req.body;

        const parcel = await Parcel.findByPk(parcelId);
        if (!parcel) {
            return res.status(404).json({ message: 'Parcel not found' });
        }

        // Update main parcel status
        parcel.currentStatus = status;
        await parcel.save({ transaction: t });

        // Add to history
        await ParcelStatus.create({
            parcelId,
            status,
            location,
            notes,
            updatedBy: req.user.id
        }, { transaction: t });

        await t.commit();
        res.json({ message: 'Status updated successfully', parcel });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ message: 'Server Error updating status' });
    }
};

// @desc    Verify payment
exports.verifyPayment = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const { status } = req.body; // 'Completed' or 'Failed'

        const payment = await Payment.findByPk(paymentId);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        payment.status = status;
        await payment.save();

        res.json({ message: 'Payment verified successfully', payment });
    } catch (error) {
        res.status(500).json({ message: 'Server Error verifying payment' });
    }
};

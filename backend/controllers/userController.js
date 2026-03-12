const db = require('../models');

const Parcel = db.Parcel;
const ParcelStatus = db.ParcelStatus;
const PickupRequest = db.PickupRequest;
const Payment = db.Payment;

// @desc    Create a new parcel & pickup request
exports.createParcel = async (req, res) => {
    const t = await db.sequelize.transaction();
    
    try {
        const {
            receiverName, receiverPhone, receiverAddress, receiverCity,
            weight, dimensions, declaredValue, pickupDate, pickupTimeSlot, pickupAddress
        } = req.body;

        // Simple delivery charge calculation logic (e.g., base 100 + 50 per kg)
        const deliveryCharge = 100 + (parseFloat(weight) * 50);
        
        // Generate pseudo-random tracking number
        const trackingNumber = 'NP' + Date.now().toString().slice(-8) + Math.floor(Math.random() * 1000);

        // 1. Create Parcel
        const parcel = await Parcel.create({
            trackingNumber,
            senderId: req.user.id,
            receiverName,
            receiverPhone,
            receiverAddress,
            receiverCity,
            weight,
            dimensions,
            declaredValue,
            deliveryCharge,
            currentStatus: 'Order Created'
        }, { transaction: t });

        // 2. Create Initial Status
        await ParcelStatus.create({
            parcelId: parcel.id,
            status: 'Order Created',
            notes: 'Parcel booked by user online',
            updatedBy: req.user.id
        }, { transaction: t });

        // 3. Create Pickup Request
        await PickupRequest.create({
            parcelId: parcel.id,
            pickupDate,
            pickupTimeSlot,
            pickupAddress,
            status: 'Scheduled'
        }, { transaction: t });

        // 4. Create Initial Payment Record (Pending)
        await Payment.create({
            parcelId: parcel.id,
            userId: req.user.id,
            amount: deliveryCharge,
            status: 'Pending'
        }, { transaction: t });

        await t.commit();

        res.status(201).json({
            message: 'Parcel created and pickup scheduled successfully',
            trackingNumber,
            parcelId: parcel.id,
            deliveryCharge
        });

    } catch (error) {
        await t.rollback();
        console.error('Create Parcel Error:', error);
        res.status(500).json({ message: 'Server error creating parcel' });
    }
};

// @desc    Track a parcel by tracking number
exports.trackParcel = async (req, res) => {
    try {
        const { trackingNumber } = req.params;

        const parcel = await Parcel.findOne({
            where: { trackingNumber },
            include: [
                {
                    model: ParcelStatus,
                    attributes: ['status', 'location', 'notes', 'createdAt']
                }
            ],
            order: [[ParcelStatus, 'createdAt', 'DESC']]
        });

        if (!parcel) {
            return res.status(404).json({ message: 'Parcel not found' });
        }

        res.json(parcel);
    } catch (error) {
        console.error('Track Parcel Error:', error);
        res.status(500).json({ message: 'Server error tracking parcel' });
    }
};

// @desc    Get user's parcel history
exports.getUserParcels = async (req, res) => {
    try {
        const parcels = await Parcel.findAll({
            where: { senderId: req.user.id },
            order: [['createdAt', 'DESC']]
        });

        res.json(parcels);
    } catch (error) {
        console.error('Get User Parcels Error:', error);
        res.status(500).json({ message: 'Server error fetching parcels' });
    }
};

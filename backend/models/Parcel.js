module.exports = (sequelize, DataTypes) => {
    const Parcel = sequelize.define('Parcel', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        trackingNumber: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        senderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        receiverName: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        receiverPhone: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        receiverAddress: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        receiverCity: {
            type: DataTypes.STRING(100)
        },
        weight: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false
        },
        dimensions: {
            type: DataTypes.STRING(100)
        },
        declaredValue: {
            type: DataTypes.DECIMAL(10, 2)
        },
        deliveryCharge: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        currentStatus: {
            type: DataTypes.STRING(50),
            defaultValue: 'Order Created'
        },
        estimatedDeliveryDate: {
            type: DataTypes.DATEONLY
        },
        assignedStaffId: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: 'Parcels'
    });

    return Parcel;
};

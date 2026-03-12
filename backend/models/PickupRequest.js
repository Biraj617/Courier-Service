module.exports = (sequelize, DataTypes) => {
    const PickupRequest = sequelize.define('PickupRequest', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        parcelId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        pickupDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        pickupTimeSlot: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        pickupAddress: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(50),
            defaultValue: 'Scheduled'
        }
    }, {
        tableName: 'PickupRequests'
    });

    return PickupRequest;
};

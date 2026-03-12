module.exports = (sequelize, DataTypes) => {
    const DeliveryStaff = sequelize.define('DeliveryStaff', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        vehicleType: {
            type: DataTypes.STRING(50)
        },
        vehicleNumber: {
            type: DataTypes.STRING(50)
        },
        licenseNumber: {
            type: DataTypes.STRING(50)
        },
        isAvailable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        currentLocation: {
            type: DataTypes.STRING(200)
        }
    }, {
        tableName: 'DeliveryStaff'
    });

    return DeliveryStaff;
};

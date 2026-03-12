module.exports = (sequelize, DataTypes) => {
    const BulkShipment = sequelize.define('BulkShipment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        wholesalerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        batchReference: {
            type: DataTypes.STRING(100),
            unique: true
        },
        totalParcels: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(50),
            defaultValue: 'Processing'
        },
        manifestFileUrl: {
            type: DataTypes.STRING(255)
        }
    }, {
        tableName: 'BulkShipments'
    });

    return BulkShipment;
};

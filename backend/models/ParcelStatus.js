module.exports = (sequelize, DataTypes) => {
    const ParcelStatus = sequelize.define('ParcelStatus', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        parcelId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        location: {
            type: DataTypes.STRING(200)
        },
        notes: {
            type: DataTypes.TEXT
        },
        updatedBy: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: 'ParcelStatus'
    });

    return ParcelStatus;
};

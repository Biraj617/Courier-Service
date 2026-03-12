module.exports = (sequelize, DataTypes) => {
    const Wholesaler = sequelize.define('Wholesaler', {
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
        companyName: {
            type: DataTypes.STRING(150)
        },
        businessRegistrationNumber: {
            type: DataTypes.STRING(100)
        },
        discountRate: {
            type: DataTypes.DECIMAL(5, 2),
            defaultValue: 0.00
        },
        apiKey: {
            type: DataTypes.STRING(255),
            unique: true
        }
    }, {
        tableName: 'Wholesalers'
    });

    return Wholesaler;
};

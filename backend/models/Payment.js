module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        parcelId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        paymentMethod: {
            type: DataTypes.STRING(50),
            defaultValue: 'Pending'
        },
        transactionId: {
            type: DataTypes.STRING(100),
            unique: true
        },
        status: {
            type: DataTypes.STRING(50),
            defaultValue: 'Pending'
        }
    }, {
        tableName: 'Payments'
    });

    return Payment;
};

module.exports = (sequelize, DataTypes) => {
    const SystemLog = sequelize.define('SystemLog', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER
        },
        action: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        details: {
            type: DataTypes.TEXT
        },
        ipAddress: {
            type: DataTypes.STRING(50)
        }
    }, {
        tableName: 'SystemLogs',
        updatedAt: false // Logs usually don't need update timestamps
    });

    return SystemLog;
};

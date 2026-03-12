const { Sequelize } = require('sequelize');
const { sequelize } = require('../config/database');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Role = require('./Role')(sequelize, Sequelize);
db.User = require('./User')(sequelize, Sequelize);
db.Parcel = require('./Parcel')(sequelize, Sequelize);
db.ParcelStatus = require('./ParcelStatus')(sequelize, Sequelize);
db.Payment = require('./Payment')(sequelize, Sequelize);
db.PickupRequest = require('./PickupRequest')(sequelize, Sequelize);
db.DeliveryStaff = require('./DeliveryStaff')(sequelize, Sequelize);
db.Wholesaler = require('./Wholesaler')(sequelize, Sequelize);
db.BulkShipment = require('./BulkShipment')(sequelize, Sequelize);
db.SystemLog = require('./SystemLog')(sequelize, Sequelize);

// Associations
// Role -> User
db.Role.hasMany(db.User, { foreignKey: 'roleId', sourceKey: 'id' });
db.User.belongsTo(db.Role, { foreignKey: 'roleId', targetKey: 'id' });

// User -> Parcel (Sender)
db.User.hasMany(db.Parcel, { foreignKey: 'senderId', sourceKey: 'id', as: 'SentParcels' });
db.Parcel.belongsTo(db.User, { foreignKey: 'senderId', targetKey: 'id', as: 'Sender' });

// User -> Parcel (Assigned Staff)
db.User.hasMany(db.Parcel, { foreignKey: 'assignedStaffId', sourceKey: 'id', as: 'AssignedParcels' });
db.Parcel.belongsTo(db.User, { foreignKey: 'assignedStaffId', targetKey: 'id', as: 'AssignedStaff' });

// Parcel -> ParcelStatus
db.Parcel.hasMany(db.ParcelStatus, { foreignKey: 'parcelId', sourceKey: 'id' });
db.ParcelStatus.belongsTo(db.Parcel, { foreignKey: 'parcelId', targetKey: 'id' });

// User -> ParcelStatus (Updated By)
db.User.hasMany(db.ParcelStatus, { foreignKey: 'updatedBy', sourceKey: 'id' });
db.ParcelStatus.belongsTo(db.User, { foreignKey: 'updatedBy', targetKey: 'id', as: 'Updater' });

// Parcel -> Payment
db.Parcel.hasOne(db.Payment, { foreignKey: 'parcelId', sourceKey: 'id' });
db.Payment.belongsTo(db.Parcel, { foreignKey: 'parcelId', targetKey: 'id' });

// User -> Payment
db.User.hasMany(db.Payment, { foreignKey: 'userId', sourceKey: 'id' });
db.Payment.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });

// Parcel -> PickupRequest
db.Parcel.hasOne(db.PickupRequest, { foreignKey: 'parcelId', sourceKey: 'id' });
db.PickupRequest.belongsTo(db.Parcel, { foreignKey: 'parcelId', targetKey: 'id' });

// User -> DeliveryStaff
db.User.hasOne(db.DeliveryStaff, { foreignKey: 'userId', sourceKey: 'id' });
db.DeliveryStaff.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });

// User -> Wholesaler
db.User.hasOne(db.Wholesaler, { foreignKey: 'userId', sourceKey: 'id' });
db.Wholesaler.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });

// Wholesaler -> BulkShipment
db.Wholesaler.hasMany(db.BulkShipment, { foreignKey: 'wholesalerId', sourceKey: 'id' });
db.BulkShipment.belongsTo(db.Wholesaler, { foreignKey: 'wholesalerId', targetKey: 'id' });

// User -> SystemLog
db.User.hasMany(db.SystemLog, { foreignKey: 'userId', sourceKey: 'id' });
db.SystemLog.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });

module.exports = db;

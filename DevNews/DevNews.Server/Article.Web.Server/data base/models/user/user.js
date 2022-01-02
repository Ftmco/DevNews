"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define('User', {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV1,
            primaryKey: true
        },
        fullName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        userName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: sequelize_1.DataTypes.STRING,
        },
        isActive: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false
        },
        emailActive: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
        },
        phoneActive: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false
        },
        activeCode: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        registerDate: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        }
    });
};
//# sourceMappingURL=user.js.map
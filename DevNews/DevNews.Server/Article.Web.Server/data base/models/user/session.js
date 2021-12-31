"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("Session", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV1,
            primaryKey: true
        },
        key: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Token'
        },
        value: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        expireDate: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        },
        date: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        }
    });
};
//# sourceMappingURL=session.js.map
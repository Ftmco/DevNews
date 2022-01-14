"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("ApFile", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV1,
            primaryKey: true
        },
        objId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        orginalName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        fileType: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true
        }
    });
};
//# sourceMappingURL=apFiles.js.map
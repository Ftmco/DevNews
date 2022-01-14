"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("Comment", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV1,
            primaryKey: true
        },
        text: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        replyId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: true
        },
        objId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false
        }
    });
};
//# sourceMappingURL=comment.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("ChannelAvatar", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV1,
            primaryKey: true
        },
        image: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        }
    });
};
//# sourceMappingURL=channelAvatar.js.map
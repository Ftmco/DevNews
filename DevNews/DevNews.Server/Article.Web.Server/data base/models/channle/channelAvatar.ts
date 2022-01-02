import { DataTypes } from "sequelize"


module.exports = (sequelize) => {
    sequelize.define("ChannelAvatar", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}
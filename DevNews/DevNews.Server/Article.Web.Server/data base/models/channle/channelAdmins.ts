import { DataTypes } from "sequelize"


module.exports = (sequelize) => {
    sequelize.define("ChannelAdmins", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        }
    })
}
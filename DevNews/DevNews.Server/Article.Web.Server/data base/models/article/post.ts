import { DataTypes } from "sequelize"

module.exports = (sequelize) => {
    sequelize.define("Post", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        message: {
            type: DataTypes.STRING,
            allowNull: true
        },
    })
}
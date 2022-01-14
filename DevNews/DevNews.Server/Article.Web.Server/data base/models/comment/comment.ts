import { DataTypes } from "sequelize"

module.exports = (sequelize) => {
    sequelize.define("Comment", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        replyId: {
            type: DataTypes.UUID,
            allowNull: true
        },
        objId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    })
}
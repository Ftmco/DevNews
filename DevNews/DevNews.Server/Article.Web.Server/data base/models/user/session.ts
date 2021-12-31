import { DataTypes } from "sequelize"


module.exports = (sequelize) => {
    sequelize.define("Session", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey:true
        },
        key: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Token'
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false
        },
        expireDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    })
}
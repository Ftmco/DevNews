import { DataTypes } from "sequelize"


module.exports = (sequelize) => {
    sequelize.define("Article", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        }
    })
}
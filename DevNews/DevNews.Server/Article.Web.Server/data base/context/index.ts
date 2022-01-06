import { Sequelize } from 'sequelize'
import applyExtraSetup from './setup';

const sequelize = new Sequelize("ArticleDb", "fteam", "1G14ijWA", {
    host: "localhost",
    dialect: "mssql",
    benchmark: true
})

const modelDefines = [
    require("../models/article/article"),
    require("../models/article/articleGroup"),
    require("../models/article/group"),
    require("../models/channle/channel"),
    require("../models/channle/channelAdmins"),
    require("../models/channle/channelUsers"),
    require("../models/user/user"),
    require("../models/user/session"),
];

for (const modelDefine of modelDefines)
    modelDefine(sequelize)

applyExtraSetup(sequelize)

sequelize.sync({ alter: { drop: false } })

export default sequelize
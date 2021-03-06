"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const setup_1 = require("./setup");
const sequelize = new sequelize_1.Sequelize("ArticleDb", "fteam", "1G14ijWA", {
    host: "localhost",
    dialect: "mssql",
    benchmark: true
});
const modelDefines = [
    require("../models/article/article"),
    require("../models/article/articleGroup"),
    require("../models/article/group"),
    require("../models/channle/channel"),
    require("../models/article/post"),
    require("../models/article/apFiles"),
    require("../models/channle/channelAdmins"),
    require("../models/channle/channelUsers"),
    require("../models/user/user"),
    require("../models/user/session"),
    require("../models/comment/comment"),
];
for (const modelDefine of modelDefines)
    modelDefine(sequelize);
(0, setup_1.default)(sequelize);
sequelize.sync({ alter: { drop: false } });
exports.default = sequelize;
//# sourceMappingURL=index.js.map
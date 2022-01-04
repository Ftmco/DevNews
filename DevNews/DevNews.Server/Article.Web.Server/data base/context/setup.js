"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function applyExtraSetup(sequelize) {
    const { Group, Article, ArticleGroups, User, Session, Channel, ChannelUsers, } = sequelize.models;
    Group.hasMany(Group);
    Group.belongsTo(Group);
    Article.hasMany(ArticleGroups);
    ArticleGroups.belongsTo(Article);
    Group.hasMany(ArticleGroups);
    ArticleGroups.belongsTo(Group);
    User.hasMany(Session);
    Session.belongsTo(User);
    Channel.hasMany(ChannelUsers);
    User.hasMany(ChannelUsers);
    ChannelUsers.belongsTo(User);
    ChannelUsers.belongsTo(Channel);
}
exports.default = applyExtraSetup;
//# sourceMappingURL=setup.js.map
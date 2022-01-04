import { Sequelize } from "sequelize";

export default function applyExtraSetup(sequelize: Sequelize) {
    const { Group, Article, ArticleGroups, User, Session, Channel, ChannelUsers,
    } = sequelize.models;

    Group.hasMany(Group);
    Group.belongsTo(Group);

    Article.hasMany(ArticleGroups);
    ArticleGroups.belongsTo(Article)

    Group.hasMany(ArticleGroups)
    ArticleGroups.belongsTo(Group)

    User.hasMany(Session)
    Session.belongsTo(User)

    Channel.hasMany(ChannelUsers)
    User.hasMany(ChannelUsers)

    ChannelUsers.belongsTo(User)
    ChannelUsers.belongsTo(Channel)



}
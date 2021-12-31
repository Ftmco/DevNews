import { Sequelize } from "sequelize";

export default function applyExtraSetup(sequelize: Sequelize) {
    const { Group, Article, ArticleGroups, User, Session, Channle, ChannleUsers } = sequelize.models;

    Group.hasMany(Group);
    Group.belongsTo(Group);

    Article.hasMany(ArticleGroups);
    ArticleGroups.belongsTo(Article)

    Group.hasMany(ArticleGroups)
    ArticleGroups.belongsTo(Group)

    User.hasMany(Session)
    Session.belongsTo(User)

    Channle.hasMany(ChannleUsers)
    User.hasMany(ChannleUsers)

    ChannleUsers.belongsTo(User)
    ChannleUsers.belongsTo(Channle)

}
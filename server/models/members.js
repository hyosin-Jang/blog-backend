const Sequelize = require("sequelize");

module.exports = class Member extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.STRING(30),
          allowNull: false,
          primaryKey: true
        },
        email: {
          type: Sequelize.STRING(30),
          allowNull: true,
          defaultValue: "cdnnnl@ewhian.net"
        },
        name: {
          type: Sequelize.STRING(30),
          allowNull: true,
          defaultValue: "name"
        },
        picture: {
          type: Sequelize.STRING(50),
          allowNull: true,
          defaultValue: "프로필사진"
        }
      },
      {
        sequelize,
        timestamp: false,
        modelName: "Member",
        tableName: "members",
        charset: "utf8",
        collate: "utf8_general_ci"
      }
    );
  }
  static associate(db) {
    db.Member.hasMany(db.Board, { foreignKey: "id", sourceKey: "id" });
  }
};

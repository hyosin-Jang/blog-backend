const Sequelize = require("sequelize");

module.exports = class Member extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        m_tokens: {
          type: Sequelize.STRING(30),
          allowNull: true,
          defaultValue: 0
        },
        m_id: {
          type: Sequelize.STRING(30),
          allowNull: false,
          primaryKey: true
        },
        m_email: {
          type: Sequelize.STRING(30),
          allowNull: true,
          defaultValue: "cdnnnl@ewhian.net"
        },
        m_name: {
          type: Sequelize.STRING(30),
          allowNull: true,
          defaultValue: "name"
        },
        m_picture: {
          type: Sequelize.STRING(20),
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
    db.Member.hasMany(db.Board, { foreignKey: "b_id", sourceKey: "m_id" });
  }
};

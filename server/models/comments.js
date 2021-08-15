const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        cm_num: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        cm_id: {
          type: Sequelize.STRING(30),
          allowNull: false
        },
        cm_content: {
          type: Sequelize.TEXT(200),
          allowNull: true
        }
      },
      {
        sequelize,
        timestamp: false,
        underscored: false,
        modelName: "Comment",
        tableName: "comments",
        charset: "utf8",
        collate: "utf8_general_ci"
      }
    );
  }
  static associate(db) {
    db.Comment.belongsTo(db.Member, { foreignKey: "cm_id", targetKey: "m_id" });
  }
};

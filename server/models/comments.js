const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        num: {
          type: Sequelize.INTEGER(100),
          autoIncrement: true,
          allowNull: true,
          primaryKey: true
        },
        board_num: {
          type: Sequelize.INTEGER(100),
          allowNull: false,
        },
        id: {
          type: Sequelize.STRING(30),
          allowNull: false
        },
        content: {
          type: Sequelize.TEXT,
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
    db.Comment.belongsTo(db.Member, { foreignKey: "id", targetKey: "id" });
    db.Comment.belongsTo(db.Board, { foreignKey : "board_num", targetKey: "num"});
  }
};

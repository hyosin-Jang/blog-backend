const Sequelize = require("sequelize");

module.exports = class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        num: {
          type: Sequelize.INTEGER(100),
          autoIncrement: true,
          allowNull: true,
          primaryKey: true
        },
        category: {
          type: Sequelize.STRING(30),
          allowNull: true,
          defaultValue: "category"
        },
        title: {
          type: Sequelize.STRING(30),
          allowNull: true
        },
        id: {
          type: Sequelize.STRING(30),
          allowNull: false
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: true
        },
        date: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.NOW
        },
        hit: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
        }
      },
      {
        sequelize,
        timestamp: false,
        modelName: "Board",
        tableName: "boards",
        charset: "utf8",
        collate: "utf8_general_ci"
      }
    );
  }
  static associate(db) {
    db.Board.belongsTo(db.Member, { foreignKey: "id", targetKey: "id" });
    db.Board.hasMany(db.Comment, { foreignKey: "board_num", sourceKey: "num" });
    db.Board.belongsTo(db.Category, { foreignKey: "category", targetKey: "category"});
  }
};

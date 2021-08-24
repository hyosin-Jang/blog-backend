const Sequelize = require("sequelize");

module.exports = class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        num: {
          type: Sequelize.INTEGER(100),
          allowNull: false,
          primaryKey: true
        },
        /*category: {
          type: Sequelize.STRING(30),
          allowNull: true
        },*/
        title: {
          type: Sequelize.STRING(30),
          allowNull: true
        },
        id: {
          type: Sequelize.STRING(30),
          allowNull: false
        },
        content: {
          type: Sequelize.TEXT
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
        underscored: false,
        modelName: "Board",
        tableName: "boards",
        charset: "utf8",
        collate: "utf8_general_ci"
      }
    );
  }
  static associate(db) {
    db.Board.belongsTo(db.Member, { foreignKey: "id", targetKey: "id" });
    db.Board.hasOne(db.Comment, { foreignKey: "board_num", sourceKey: "num"});
  }
};

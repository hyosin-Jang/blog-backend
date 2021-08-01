const Sequelize = require("sequelize");

module.exports = class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        b_num: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        b_category: {
          type: Sequelize.STRING(30),
          allowNull: true
        },
        b_title: {
          type: Sequelize.STRING(30),
          allowNull: true
        },
        b_id: {
          type: Sequelize.STRING(30),
          allowNull: false
        },
        b_content: {
          type: Sequelize.TEXT
        },
        b_date: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.NOW
        },
        b_hit: {
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
    db.Board.belongsTo(db.Member, { foreignKey: "b_id", targetKey: "m_id" });
  }
};

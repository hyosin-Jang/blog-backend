const Sequelize = require("sequelize");

module.exports = class Category extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        category: {
          type: Sequelize.STRING(30),
          allowNull: false,
          primaryKey: true
        }
      },
      {
        sequelize,
        timestamp: false,
        underscored: false,
        modelName: "Category",
        tableName: "categories",
        charset: "utf8",
        collate: "utf8_general_ci"
      }
    );
  }
  static associate(db) {
    db.Category.hasMany(db.Board, { foriegnKey : "category", sourceKey: "category"});
  }
};

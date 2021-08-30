const sequelize = require("../models").sequelize;
const Category = require("../models/categories");
const Board = require("../models/boards");

module.exports = {
  add : {
    category : async (body, callback) => {
      try{
        await Category.count({
          where : { category : body.category}
        })
        .then(cnt => {
          if(cnt > 0){
            callback(false);
          }
          else {
            Category.create({
              category : body.category
            })
            .then( () => {
              callback(true)
            })
          }
        });
      } catch (err) {
          throw err;
      }
    }
  },
  get : {
    category : async (callback) => {
      try{
        await Category.findAll()
        .then(result => {
          callback(result);
        })
      }
      catch(err) {
        throw err;
      }
    }    
  } ,
  update : {
    category : async (body, callback) => {
      try{
        await Category.count({
          where : { category : body.category }
        })
        .then(cnt => {
          if(cnt > 0){
            callback(false);
          }
          else {
            Category.update({ category : body.category },{
              where : { category : body.category }
            })
            .then( () => {
              callback(true)
            })
          }
        });
      } catch (err) {
          throw err;
      }
    }
  },
  delete : {
    category : async (body, callback) => {
      try{
        await Category.destroy({
          where : { category : body.category }
        })
        .then( () => {
          Board.update({ category : null }, {
            where : { category : body.category }
          })
          .then( () => {
            callback(true)
          })
        });
      } catch (err) {
        throw err;
      }
    }
  }
}
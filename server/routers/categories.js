const sequelize = require("../models").sequelize;
const Category = require("../models");
const Board = require("../models");

module.exports = {
  add : {
    category : (body, callback) => {
      Category.count({
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
          .catch(err => {
            throw err;
          })
        }
      })
    }
  },
  get : {
    category : (callback) => {
      Category.findAll()
      .then(result => {
        callback(result);
      })
      .catch(err => {
        throw err;
      })
    }    
  } ,
  update : {
    category : (body, callback) => {
      Category.count({
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
          .catch(err => {
            throw err;
          })
        }
      })
    }
  },
  delete : {
    category : (body, callback) => {
      Category.destroy({
        where : { category : body.category }
      })
      .then( () => {
        Board.update({ category : null }, {
          where : { category : body.category }
        })
        .then( () => {
          callback(true)
        })
        .catch(err => {
          throw err;
        })
      })
    }
  }
}
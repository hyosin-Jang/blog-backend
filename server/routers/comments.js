const sequelize = require("./models").sequelize;
const Comment = require("../models");

module.exports = {
  //Create
    add : {
        comment : (body, callback) => {
            Comment.create({
                id : body.id,
                content : body.content
            })
            .then( () => {
                callback(true)
            })
            .catch( () => {
                callback(false)
            })
        }
    },
    //Select
    get : {
        comment : (body, callback) => {
            Comment.findAll({
                include : [
                    {
                        model : members,
                        attributes : ['id']
                    }
                ],
                where : { board_num : body.board_num }
            })
            .then( (result) => {
                callback(result)
            })
            .catch(err => {
                throw err;
            })
        }
    },
    //Update
    update : {
        comment : (body, callback) => {
            Comment.update({
                id : body.id,
                content : body.content
            }, {
                where : { num : body.num }
            })
            .then( () => {
                callback(true)
            })
            .catch(err => {
                throw err;
            })
        }
    },
    //Delete
    delete : {
        comment : (body, callback) => {
            Comment.destroy({
                where : { num : body.num }
            })
            .then( () => {
                callback(true)
            })
            .catch(err => {
                throw err;
            })
        }
    }
}
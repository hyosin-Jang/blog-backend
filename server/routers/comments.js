const sequelize = require("../models").sequelize;
const Comment = require("../models/comments");
const Member = require("../models/members");

module.exports = {
  //Create
    add : {
        comment : async (body, callback) => {
            try{
                await Comment.create({
                    board_num : body.board_num,
                    id : body.id,
                    content : body.content
                })
                .then( () => {
                    callback(true)
                })
            } catch(err) {
                callback(false);
                throw err;
            }
        }
    },
    //Select
    get : {
        comment : async (body, callback) => {
            try{
                await Comment.findAll({
                    include : [
                        {
                            model : Member,
                            attributes : ['id']
                        }
                    ],
                    where : { board_num : body.board_num }
                })
                .then( (result) => {
                    callback(result)
                })
            } catch(err) {
                throw err;
            }
        }
    },
    //Update
    update : {
        comment : async (body, callback) => {
            try{
                await Comment.update({
                    id : body.id,
                    content : body.content
                }, {
                    where : { num : body.num }
                })
                .then( () => {
                    callback(true)
                })
            } catch(err) {
                throw err;
            }
        }
    },
    //Delete
    delete : {
        comment : async (body, callback) => {
            try{
                await Comment.destroy({
                    where : { num : body.num }
                })
                .then( () => {
                    callback(true)
                })
            } catch(err) {
                throw err;
            }
        }
    }
}

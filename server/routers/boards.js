const sequelize = require("../models").sequelize;
const Board = require("../models");

module.exports = {
    //Create
    add : {
        board : (body, callback) => {
            Board.create({
                title : body.title,
                id : body.id,
                content : body.content,
                date : new Date(),
                hit : 0
            })
            .then(data => {
                callback(true)
            })
            .catch(err => {
                throw err;
            })
        }
    },
    //Select
    get : {
        //게시물 목록 조회
        board : (callback) => {
            Board.findAll()
            .then(data => {
                callback(data)
            })
            .catch(err => {
                throw err;
            })
        },
        //게시물 내용 조회
        board_data : (body, callback) => {
            Board.findAll({
                include : [
                    {
                        model : members,
                        attributes : ['id']
                    }
                ],
                where : { num : body.num }
            })
            .then(result => {
                callback(result);
            })
            .catch(err => {
                throw err;
            })
        },
    },
    //Update
    update : {
        //게시물 내용 업데이트
        board : (body, callback) => {
            Board.update({
                title : body.title,
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
        },
        //조회수 업데이트
        hit : (body, callback) => {
            Board.update({ hit : sequelize.literal('hit + 1')}, {
                where : { num : body.num }
            })
            .then(data => {
                callback(true)
            })
            .catch(err => {
                throw err;
            })
        }
    },
    //Delete
    delete : {
        //게시물 삭제
        board : (body, callback) => {
            Board.destroy({
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
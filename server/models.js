const sequelize = require("./models").sequelize;
const Op = require("sequelize");

const {
    Admin,
    Board,
    Category,
    Member,
    //Sequelize: { Op }
  } = require('./models');
//여기아래줄오류
//sequelize.query('SET NAMES utf8;');

module.exports = {
    api : {
        searchInfo : (body, callback) => {
            Member.findAll({
                where : { [Op.and]: [{ id : body.id }] }
            })
            .then(data => {
                callback(data)
            })
            .catch(err => {
                throw err;
            })
        },
    },

    search : {
        
        id : (body, callback) => {
            Member.findAll({
                where: {
                    name : body.m_name,
                }
            })
            .then(result => { callback(result) })
            .catch(err => { throw err; })
        },
    },

    add : {
        board : (body, callback) => {

            Board.create({
                title : body.b_title,
                contents : body.b_contents,
                date : new Date(86400000)
            })
            .then(data => {
                callback(true)
            })
            .catch(err => {
                throw err;
            })
        },

        category : (body, callback) => {
            Category.count({
                where : { name : body.name }
            })
            .then(cnt => {
                if(cnt > 0) {
                    callback(false);
                } else {
                    Category.create({
                        name : body.name
                    })
                    .then( () => { callback(true) })
                }
            })
        },

        user : (body, callback) => {
            
            Member.count({
                where : { id : body.m_id }
            })
            .then(cnt => {
                if(cnt > 0) {
                    callback(false);
                } else {
                    User.create({
                        admin : 'N',
                        id : body.m_id,
                        name : body.m_name,
                        email : body.m_email,
                        //signup_date : now_date
                    })
                    .then( () => callback(true) );
                }
            })
        }
    },

    update : {

        board : (body, callback) => {
            Board.update({
                title : body.b_title,
                contents : body.b_content,
                cat_id : body.b_category
            }, {
                where : { board_id : body.b_id }
            })
            .then( () => { callback(true) })
            .catch(err => { throw err; })
        }
    },

    delete : {
        category : (body, callback) => {
            Category.destroy({
                where : { id : body.id }
            })
            .then( () => {
                Board.update({ cat_id : 0 }, {
                    where : { cat_id : body.id }
                })
                .then( () => { callback(true) })
                .catch(err => { throw err; })
            })
        },

        board : (body, callback) => {
            Board.destroy({
                where : { board_id : body.b_id }
            })
            .then( () => { callback(true) })
            .catch(err => { throw err; })
        },
    },

    modify : {
        category : (body, callback) => {
            Category.count({
                where : { name : body.name }
            })
            .then(cnt => {
                console.log(cnt)
                if(cnt > 0) {
                    callback(false);
                    
                } else {
                    Category.update({ name : body.name }, {
                        where : { id : body.id }
                    })
                    .then( () => { callback(true) })
                    .catch(err => { throw err; })
                }
            })
        }
    },

    get : {

        board : (body, callback) => {
            let search = "%%";

            if(body.search) {
                search = '%' + body.search + '%';
            }

            let where_1 = body.category;
            let where_2 = '';
                        
            if(!body.category) {
            // 전체보기를 클릭했을 경우
                 where_2 = 0;
            
            } else if(body.category) {
            // 카테고리를 클릭했을 경우
                 where_2 = null;
            }

            Board.findAll({
                where : {
                    title : { [Op.like] : search },
                    contents : { [Op.like] : search },
                    cat_id : {
                        [Op.or] : {
                            [Op.eq] : where_1,
                            [Op.gt] : where_2
                        }
                    }
                },
                    limit : (body.page * body.limit),
                    offset : (body.page - 1) * body.limit,
                    order: sequelize.literal('board_id DESC')
                })
            .then(data => { callback(data) })
            .catch(err => { throw err; })
        },

        board_cnt : (body, callback) => {
            let search = "%%";

            if(body.search) {
                search = '%' + body.search + '%';
            }

            let where_1 = body.category;
            let where_2 = '';
                        
            if(!body.category) {
            // 전체보기를 클릭했을 경우
                 where_2 = 0;
            
            } else if(body.category) {
            // 카테고리를 클릭했을 경우
                 where_2 = null;
            }
    
            Board.count({
                where : {
                    title : { [Op.like] : search },
                    contents : { [Op.like] : search },
                    cat_id : {
                        [Op.or] : {
                            [Op.eq] : where_1,
                            [Op.gt] : where_2
                        }
                    }
                },
            })
            .then(result => {
                callback(result);
            })
        },

        board_data : (body, callback) => {
            Board.findAll({
                where : { board_id : body.id }
            })
            .then(result => {
                callback(result);
            })
            .catch(err => {
                throw err;
            })
        },

        category : (callback) => {
            Category.findAll()
            .then(result => { callback(result); })
            .catch(err => { throw err; })
        },

        pre_and_next : (body, callback) => {
            let result = {};

            let where_1 = body.category;
            let where_2 = '';
                        
            if(!body.category) {
            // 전체보기를 클릭했을 경우
                 where_2 = 0;
            
            } else if(body.category) {
            // 카테고리를 클릭했을 경우
                 where_2 = null;
            }

            Board.findAll({
                // 다음글 구하기
                where : {
                    board_id : {
                        [Op.gt] : body.b_id
                    },
                    cat_id : {
                        [Op.or] : {
                            [Op.eq] : where_1,
                            [Op.gt] : where_2
                        }
                    }
                },
                limit : 1

            }).then(
                next => {
                    result['next'] = next;

                    // 이전글 구하기
                    Board.findAll({
                        where : {
                            board_id : {
                                [Op.lt] : body.b_id
                            },
                            cat_id : {
                                [Op.or] : {
                                    [Op.eq] : where_1,
                                    [Op.gt] : where_2
                                }
                            }
                        },
                        limit : 1,
                        order: sequelize.literal('board_id DESC')
                    })
                    .then(
                        pre => {
                            result['pre'] = pre;
                            callback(result);
                        }
                    )
                }
            )
        } // get.pre_and_next 끝


        /*
        board : (body, callback) => {
            Board.findAll({
                limit : (body.page * body.limit),
                offset : (body.page - 1) * body.limit,
                order: sequelize.literal('board_id DESC')
            })
            .then(data => {
                callback(data)
            })
            .catch(err => {
                throw err;
            })
        },
        board_cnt : (callback) => {
            Board.count()
            .then(result => {
              callback(result);
            })
        },
        board_data : (body, callback) => {
            Board.findAll({
                where : { board_id : body.id }
            })
            .then(result => {
                callback(result);
            })
            .catch(err => {
                throw err;
            })
        }
         */
    }


}


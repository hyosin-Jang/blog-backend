const sequelize = require("./models").sequelize;


const {
    Admin,
    Board,
    //Sequelize: { Op }
  } = require('./models');
sequelize.query('SET NAMES utf8;');

module.exports = {
    
    add : {
        board : (body, callback) => {

            Board.create({
                title : body.title,
                contents : body.contents,
                date : new Date(86400000)
            })
            .then(data => {
                callback(true)
            })
            .catch(err => {
                throw err;
            })
        }
    }

}


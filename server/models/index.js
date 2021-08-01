const Sequelize = require('sequelize');
const Member = require('./members');
const Board = require('./boards');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db= {};

// MySQL 연결 객체 생성
const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;

// memeber 모델 연결, db에 require해서 member 접근
db.Member = Member;
db.Board = Board;

// static.init 메서드 호출
Member.init(sequelize);
Board.init(sequelize);

Member.associate(db);
Board.associate(db);

module.exports = db;

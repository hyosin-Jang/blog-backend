const sequelize = require("../models").sequelize;
const Board = require("../models/boards");

module.exports = {
  //Create
  // body: {title: "dd", contents:"oo"}
  add: {
    board: async (body, callback) => {
      try {
        const board = await Board.create({
          num: 5,
          category: "백엔드",
          title: body.title, // title
          id: "cdnnnl",
          content: body.contents, // contents
          date: new Date(),
          hit: 0
        }).then(data => {
          callback(true);
        });
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  },
  //Select
  get: {
    //게시물 목록 조회
    board: async callback => {
      await Board.findAll({})
        .then(data => {
          callback(data);
        })
        .catch(err => {
          throw err;
        });
    },
    //게시물 내용 조회
    board_data: async (body, callback) => {
      await Board.findAll({
        include: [
          {
            // model: members,
            attributes: ["id"]
          }
        ],
        where: { num: body.num }
      })
        .then(result => {
          callback(result);
        })
        .catch(err => {
          throw err;
        });
    }
  },
  //Update
  update: {
    //게시물 내용 업데이트
    board: async (body, callback) => {
      await Board.update(
        {
          title: body.title,
          id: body.id,
          content: body.content
        },
        {
          where: { num: body.num }
        }
      )
        .then(() => {
          callback(true);
        })
        .catch(err => {
          throw err;
        });
    },
    //조회수 업데이트
    hit: async (body, callback) => {
      await Board.update(
        { hit: sequelize.literal("hit + 1") },
        {
          where: { num: body.num }
        }
      )
        .then(data => {
          callback(true);
        })
        .catch(err => {
          throw err;
        });
    }
  },
  //Delete
  delete: {
    //게시물 삭제
    board: async (body, callback) => {
      await Board.destroy({
        where: { num: body.num }
      })
        .then(() => {
          callback(true);
        })
        .catch(err => {
          throw err;
        });
    }
  }
};

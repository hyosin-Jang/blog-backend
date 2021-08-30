const path = require("path");
const boards = require("./boards");
const comments = require("./comments");
const members = require("./members");

const sequelize = require("../models").sequelize;
const Op = require("sequelize");
const cors = require("cors");

const {
  //Admin,
  Board,
  Category,
  Member
  //Sequelize: { Op }
} = require("../models");

module.exports = {
  //needs: () => upload,

  add: {
    board: (req, res) => {
      //{title: 'oo', contents:'oo'}
      console.log("req", req.body);
      const status = "성공";
      res.send(200, status);

      boards.add.board(req.body, result => {
        /*
        if (result) {
          res.send(200, { result: true }); // => true면 게시물 추가
        }
        */
      });
    }
  },

  //  { num: id }
  get: {
    board: (req, res) => {
      console.log("req", req.body);
      const body = req.body;

      boards.get.board(body, result => {
        if (result) {
          res.send(result);
        }
      });
    },
    /*
    comment: (req, res) => {
      const body = req.body;

      comments.add.comment(body, result => {
        res.send(result);
      });
    }
    */

    member: (req, res) => {
      // req.body 전달
      members.get.member(req.body, result => {
        // result = "title", "date"
        if (result) {
          res.send(result);
        }
      });
    },

    pre_and_next: (body, callback) => {
      let result = {};

      let where_1 = body.category;
      let where_2 = "";

      if (!body.category) {
        // 전체보기를 클릭했을 경우
        where_2 = 0;
      } else if (body.category) {
        // 카테고리를 클릭했을 경우
        where_2 = null;
      }

      Board.findAll({
        // 다음글 구하기
        where: {
          board_id: {
            [Op.gt]: body.b_id
          },
          cat_id: {
            [Op.or]: {
              [Op.eq]: where_1,
              [Op.gt]: where_2
            }
          }
        },
        limit: 1
      }).then(next => {
        result["next"] = next;

        // 이전글 구하기
        Board.findAll({
          where: {
            board_id: {
              [Op.lt]: body.b_id
            },
            cat_id: {
              [Op.or]: {
                [Op.eq]: where_1,
                [Op.gt]: where_2
              }
            }
          },
          limit: 1,
          order: sequelize.literal("board_id DESC")
        }).then(pre => {
          result["pre"] = pre;
          callback(result);
        });
      });
    },

    /*
    board_cnt: (body, callback) => {
      let search = "node.js";

      if (body.search) {
        search = "%" + body.search + "%";
      }

      let where_1 = body.category;
      let where_2 = "";

      if (!body.category) {
        // 전체보기를 클릭했을 경우
        where_2 = 0;
      } else if (body.category) {
        // 카테고리를 클릭했을 경우
        where_2 = null;
      }

      Board.count({
        where: {
          title: { [Op.like]: search },
          contents: { [Op.like]: search },
          cat_id: {
            [Op.or]: {
              [Op.eq]: where_1,
              [Op.gt]: where_2
            }
          }
        }
      }).then(result => {
        callback(result);
      });
    },
*/
    board_data: (req, res) => {
      const body = req.body; // board_id

      console.log("req.body:", body);
      const num = Number(body.num);
      console.log(num);
      boards.get.board_data(num, data => {
        res.send(200, data);
      });
    },
    comment: (req, res) => {
      const body = req.body;

      comments.get.comment(body, data => {
        res.send(200, data); // => 댓글 내용 전송
      });
    }
  },
  update: {
    hit: (req, res) => {
      const body = req.body;

      boards.update.hit(body, result => {
        if (result) {
          res.send(200, { result: true });
        }
      });
    },
    board: (req, res) => {
      const body = req.body;

      boards.update.board(body, data => {
        res.send(200, { result: true });
      });
    },
    comment: (req, res) => {
      const body = req.body;

      comments.update.comment(body, result => {
        res.send(200, { result: true });
      });
    }
  },
  delete: {
    board: (req, res) => {
      const body = req.body;

      boards.delete.board(body, () => {
        res.send(200, { result: true });
      });
    },
    comment: (req, res) => {
      const body = req.body;

      comments.delete.comment(body, () => {
        res.send(200, { result: true });
      });
    }
  }
};

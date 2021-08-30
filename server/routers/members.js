const sequelize = require("../models").sequelize;
const Member = require("../models/members");

module.exports = {
  //Select

  // /api/get/member
  get: {
    //  멤버 아이디에 따라 제목, 날짜 반환
    // req: body.id에 사용자 googleId 필요
    member: async (body, callback) => {
      try {
        const user = await Member.findAll({
          attributes: ["title", "date"],
          where: {
            id: body.id
          }
        }).then(() => {
          callback(user); // title, data 반환
        });
      } catch (err) {
        throw err;
      }
    }
  },

  // /api/add/member
  // 멤버 등록
  add: {
    member: async (body, callback) => {
      try {
        await Member.create({
          email: body.email,
          id: body.id,
          name: body.name,
          picture: body.picture
        }).then(() => {
          callback(true);
        });
      } catch (err) {
        throw err;
      }
    }
  },

  delete: {
    //멤버 삭제
    member: async (body, callback) => {
      try {
        await Member.destroy({
          where: { num: body.id } // body.id 필요
        }).then(() => {
          callback(true);
        });
      } catch (err) {
        throw err;
      }
    }
  }
};

const express = require("express");
const router = express.Router();
const controller = require("./controller");
const cors = require("cors");

router.use(
  cors({
    credentials: true
  })
);

const authRoutes = require("./auth-routes");
const profileRoutes = require("./profile-routes");

router.get("/auth", authRoutes);
// main 페이지에서 목록만 보임.
// //router.post('/send/pw', controller.api.sendPw);

// board/routes
router.post("/add/board", controller.add.board);

/*
router.post("/get/board", controller.get.board);
router.post("/get/board_data", controller.get.board_data);
router.post("/update/hit", controller.update.hit);
router.post("/update/board", controller.update.board);
router.post("/delete/board", controller.delete.board);

router.post("/add/comment", controller.add.comment);
router.post("/get/comment", controller.get.comment);
router.post("/update/comment", controller.update.comment);
router.post("/delete/comment", controller.delete.comment);
*/
/*
router.post('/add/board', controller.add.board);//게시판 게시글 추가 => post db 등록
router.post('/add/category', controller.add.category);
router.get('/get/category', controller.get.category);// board 게시판 가져오기 get
router.get('/get/board', controller.get.board);
router.post('/get/board_cnt', controller.get.board_cnt);//게시글 개수 가져오기 - 페이지네이션 할 때, 10개 이상이면 다음 페이지 버튼 나타나기
router.post('/get/board_data', controller.get.board_data);//게시글 내용 가져오기
router.post('/get/pre_and_next', controller.get.pre_and_next);
router.post('/update/board', controller.update.board);
router.post('/delete/category', controller.delete.category);
router.post('/delete/board', controller.delete.board);
router.post('/modify/category', controller.modify.category);
*/

//router.get('/get/data');

//router.post('/add/data');
//router.post('/modify/data');
//router.post('/delete/data');

module.exports = router;

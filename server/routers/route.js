const express = require('express');
const router = express.Router();
const controller = require('../controller')
const cors = require("cors");

router.use(
    cors({
      credentials: true
    })
  );
  


//router.post('/send/pw', controller.api.sendPw);

router.post('/add/board', controller.add.board);
router.post('/add/category', controller.add.category);


router.get('/get/category', controller.get.category);
router.post('/get/board', controller.get.board);
router.post('/get/board_cnt', controller.get.board_cnt);
router.post('/get/board_data', controller.get.board_data);
router.post('/get/pre_and_next', controller.get.pre_and_next);

router.post('/update/board', controller.update.board);

router.post('/delete/category', controller.delete.category);
router.post('/delete/board', controller.delete.board);

router.post('/modify/category', controller.modify.category);

//router.get('/get/data');

//router.post('/add/data');
//router.post('/modify/data');
//router.post('/delete/data');

module.exports = router;

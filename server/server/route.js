const express = require('express');
const router = express.Router();
const controller = require('./controller')

//router.post('/send/pw', controller.api.sendPw);

router.post('/add/board', controller.add.board);
router.post('/get/board', controller.get.board);
router.get('/get/board_cnt', controller.get.board_cnt);
router.post('/get/board_data', controller.get.board_data);



//router.get('/get/data');

//router.post('/add/data');
//router.post('/modify/data');
//router.post('/delete/data');

module.exports = router;

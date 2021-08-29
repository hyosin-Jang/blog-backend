const psth = require('path');
const boards = require('./boards');
const comments = require('./comments');
const categories = require('./categories');

module.exports = {
    needs: () => upload,

    /*
    api: {
        sendPw : (req, res) =>{
            const body = req.body;
            //const hash = hashing.enc(body.id, body.password, salt)
            
            console.log(body.id, body.password)
            
        

            //console.log('1. salt 값 : ' , salt)
            //console.log('3. hash 결과 : ', hash)
        },
    },
    */
    add : {
        board : (req, res) => {
            const body = req.body;

            boards.add.board(body, result => {
                if(result) {
                    res.send(true);
                }
            })
        },
        category : (req, res) => {
            const body = req.body;

            categories.add.category(body, result => {
                var obj = {};
                if(result) {
                    obj['suc'] = true;
                    obj['msg'] = '카테고리가 생성되었습니다.';
                }
                else {
                    obj['suc'] = false;
                    obj['msg'] = '이미 있는 카테고리입니다.';
                }
                res.send(obj)
            })
        },
        comment : (req,res) => {
            const body = req.body;

            comments.add.comment(body, result => {
                res.send(result)
            })
        }
    },
    get : {
        board : (req, res) => {
            const body  = req.body; 

            boards.get.board(body, result => {
                if(result) {
                res.send(result);
                }
            })
        },
        board_data : (req, res) => {
            const body = req.body;
    
            boards.get.board_data(body, data => {
              const result = { data : data }
              res.send(result)
            })
        },
        category : (req, res) => {
            categories.get.category(data => {
                res.send(data)
            })
        },
        comment : (req, res) => {
            const body = req.body;

            comments.get.comment(body, data => {
                res.send(data)
            })
        }
    },
    update : {
        hit : (req, res) => {
            const body = req.body;

            boards.update.hit(body, result => {
                if(result){
                    res.send(true);
                }
            })
        },
        board : (req, res) => {
            const body = req.body;

            boards.update.board(body, data => {
                res.send(true)
            })
        },
        category : (req, res) => {
            const body = req.body;

            categories.update.category(body, result =>{
                var obj = {};
                if(result) {
                    obj['suc'] = true;
                    obj['msg'] = '카테고리가 수정되었습니다.';
                }
                else {
                    obj['suc'] = false;
                    obj['msg'] = '이미 있는 카테고리입니다.';
                }
                res.send(obj)
            })
        },
        comment : (req, res) => {
            const body = req.body;

            comments.update.comment(body, result => {
                res.send(true)
            })
        }
    },
    delete : {
        board : (req, res) => {
            const body = req.body;

            boards.delete.board(body, () => {
                res.send(true)
            })
        },
        category : (req, res) => {
            const body = req.body;

            categories.delete.category(body, result => {
                if(result){
                    res.send(result);
                }
            })
        },
        comment : (req, res) => {
            const body = req.body;

            comments.delete.comment(body, () => {
                res.send(true)
            })
        }
    }


   
}

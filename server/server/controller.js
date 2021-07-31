const psth = require('path');
const model = require('./model');


const salt  = require(path.join(__dirname, 'config', 'db.json'))
 .salt


const hashing = require(path.join(__dirname, 'config', 'hashing.js'))


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
            console.log(req.body);
            const body = req.body;

            model.add.board(body, result => {
                if(result) {
                    res.send(true);
                }
            })

        }
    },
    get : {
        board : (req, res) => {
  
            const body  = req.body; 

            model.get.board(body, result => {
                if(result) {
                res.send(result);
                }
            })
        },

        board_cnt : (req, res) => {

            model.get.board_cnt(cnt => {
              const result = { cnt : cnt }
              res.send(result)
            })
        },
        board_data : (req, res) => {
            const body = req.body;
    
            model.get.board_data(body, data => {
              const result = { data : data }
              res.send(result)
            })
        }
  
    
        
          
    }


   
}
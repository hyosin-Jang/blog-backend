const proxy = require("http-proxy-middleware");

module.exports = function(app){
    app.use(proxy(
        '/api', 
        proxy({
        target : "http://localhost:4000",
        secure : false
    })
    ));
    
};
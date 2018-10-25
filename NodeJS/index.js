var http = require('http');
var server = http.createServer(function(req, res) {
    switch(req.url){
        case '/1.html':
            res.write("1111111");
            break;
        case '/2.html':
            res.write('22222222');
            break;
        case '/3.html':
            res.write("333333333");
            break;
        default:
            res.write("404");
            break;

    }
    
    res.end(); 
});

server.listen(8080);
const http = require('http');
const fs = require('fs');
// const queryString = require('querystring');
const urlLib = require('url');

let server = http.createServer(function(req, res) {
    //request
    //response
    let GET = {};
    //normal
    /* if(req.url.indexOf('?') != -1){
        var arr = req.url.split('?');
        var url = arr[0];
        var arr2 = arr[1].split('&');
    
        for(var i=0; i<arr2.length; i++){
            var arr3 = arr2[i].split('=');
            GET[arr3[0]] = arr3[1]; 
        }
    }else{
        var url = req.url;
    } */

    //querystring
    /* if(req.url.indexOf('?') != -1){
        var arr = req.url.split('?');
        var url = arr[0];
        GET = queryString.parse(arr[1]);
    }else{
        var url = req.url;
    } */

    //url
    var obj = urlLib.parse(req.url, true);
    var url = obj.pathname;
    GET = obj.query;
    console.log(url, GET);

    var str = '';
    req.on('data', function (data){
        str += data;
    });
    req.on('end', function (){
        const POST = queryString.parse(str);

        let file_name = "./www" + url;

        fs.readFile(file_name, function(err, data) {
            if(err){
                res.write('404');
            }else{
                res.write(data);
            }
            res.end(); 
            console.log('finish');
        });
    });
});

server.listen(8080);
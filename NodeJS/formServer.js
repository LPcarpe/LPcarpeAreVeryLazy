const http = require('http');
const fs = require('fs');
const queryString = require('querystring');
const urlLib = require('url');

var user = {};

http.createServer(function (req, res){
    var str = '';

    req.on('data', function (data){
        str += data;
    });
    req.on('end', function (){
        var obj = urlLib.parse(req.url, true);

        const url = ob.pathname;
        const GET = obj.query;
        const POST = queryString(str);
        
        //判断接口
        if(url == '/user'){
            switch(GET.act){
                case 'reg':
                    if(user[GET.user]){
                        res.write('{"ok": false, "msf": "该用户已经存在"}');
                    }else{
                        res.write('{"ok": true, "msg": "注册成功"}');
                    }
                    break;
                case 'login':
                    if(users[GET.user] == null){
                        res.wtite('{"ok": false, "msg": "该用户不存在"}');
                    }else if(users[GET.user] != GET.pass){
                        res.write('{"ok": false, "msg": "账号或密码错误"}');
                    }else{
                        res.write('{"ok": true, "msg": "登录成功"}');
                    }
                    break;
                default: 
                    res.write('{"ok": false, "msg": "未知的act"}');
            }
            res.end();
        }
        else{//读取文件
            var file_name = '/www' + url;
            fs.readFile(file_name, function(err, data){
                if(err){
                    res.write('404');
                }else{
                    res.write(data);
                }
                res.end();
            });
        }

    });
    

}).listen(8080);
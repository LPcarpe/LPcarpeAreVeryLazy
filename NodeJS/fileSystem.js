const fs = require('fs');

fs.readFile('aaa.txt', function (err, data){
    if(err){
        console.log('读取失败');
    }else{
        console.log(data.toString());
    }
});
//writeFile(文件名，内容，回调)
fs.writeFile('bbb.txt', "dsfdssdfsdfsdfdsfsd", function (err){
    console.log(err);
})
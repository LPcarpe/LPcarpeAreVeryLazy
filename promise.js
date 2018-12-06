let p1 = new Promise(function(resolve, reject) {
    $.ajax({
            url: 'arr.txt',
            dataType: 'json',
            success(err) {
                resolve(err);
            },
            error(err) {
                reject(err);
            }
      });
});
let p2 = new Promise(function(resolve, reject) {
    $.ajax({
            url: 'arr.txt',
            dataType: 'json',
            success(err) {
                resolve(err);
            },
            error(err) {
                reject(err);
            }
      });
});

/* p1.then(function() {
    alert('成功了');
}, function(){
    alert('失败了');
}) */

Promise.all([
    p1,
    p2
]).then(function(arr) {
    let [res1, res2] = arr;
    alert('全部都成功了');
    console.log(arr1);
    console.log(arr2);
}, function() {
    alert('至少有一个失败了');
})
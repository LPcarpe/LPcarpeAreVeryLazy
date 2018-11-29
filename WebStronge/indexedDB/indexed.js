
var db;
function initDB() {
    var request = window.indexedDB.open('dataBase');

    request.onupgradeneeded = function(event) {
        db = event.target.result;
        console.log('正在更新...')
        //拿到数据库实例。
        var objectStore;
        if(!db.objectStoreNames.contains('person')){
            objectStore = db.createObjectStore('person',{keyPath: 'id', autoIncrement: true});
            objectStore.createIndex('name', 'name', {unique: true});
            objectStore.createIndex('emial', 'email', {unique: true});
        }
    }
    request.onsuccess = function(event) {
        db = request.result;
        //拿到数据库对象
        console.log('打开数据库成功')

        add();

        function add() {
            var request = db.transaction(['person'], 'readwrite')
              .objectStore('person')
              .add({ id: 1, name: 'lpcarpe', age: 24, email: 'lpcarpe@example.com' });
          
            request.onsuccess = function (event) {
              console.log('数据写入成功');
            };
          
            request.onerror = function (event) {
              console.log('数据写入失败');
            }
          }
          
    }
    request.onerror = function(event) {
        
        console.log('数据库打开出错');
    }
}


  initDB();



//var objectStore = db.createObjectStore('person', {autoIncrement: true})
//如果数据记录里面没有合适作为主键的属性，那么可以让 IndexedDB 自动生成主键。
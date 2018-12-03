
var db;
function initDB() {
    var request = window.indexedDB.open('dataBase');

    request.onupgradeneeded = function(event) {
        db = event.target.result;
        //拿到数据库实例。
        console.log('正在更新...')
        console.log("数据库对象" + db);
        
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
        console.log("数据库对象的实例"+db);

/*      add(1,'lpcarpe', 24, 'lpcarpe@example.com');
        add(2, 'shark', 22, 'happyshark@example.com');
        readAll();
        update(1, '张三', 23, 'zhangsan@example.com');
        remove(2);
        readAll(); */

        function add(id, name, age, email) {
            var tran = db.transaction(['person'], 'readwrite')
              .objectStore('person')
              .add({ id: id, name: name, age: age, email: email });
          
            tran.onsuccess = function (event) {
              console.log('数据写入成功');
            };
            tran.onerror = function (event) {
              console.log('数据写入失败');
            }
        }//添加一条数据
        function read(id) {
            var tran = db.transaction(['person']);
            var objectStore = tran.objectStore('person');
            var request = objectStore.get(id);
            //根据主键获取记录

            request.onerror = function(event) {
                console.log('事务失败');
            }
            request.onsuccess = function(event) {
                if(request.result){
                    //获取到的数据
                    console.log('Name: ' + request.result.name);
                    console.log('Age: ' + request.result.age);
                    console.log('Email: ' + request.result.email)
                }else{
                    console.log('未获得数据记录');
                }
             }
        }//获取数组
        function readAll() {
            var objectStore = db.transaction('person').objectStore('person');

            objectStore.openCursor().onsuccess = function(event) {
                var cursor = event.target.result;

                if(cursor){
                    console.log('Id: ' + cursor.key);
                    console.log('Name: ' + cursor.value.name);
                    console.log('Age: ' + cursor.value.age);
                    console.log('email: ' + cursor.value.email);
                    cursor.continue();
                }else{
                    console.log('no more...');
                }
            }
        }//遍历数据
        function update(id, name, age, email) {
            var request = db.transaction(['person'], 'readwrite')
                            .objectStore('person')
                            .put({id:id, name:name, age:age, email:email});
                            //更新数据要使用IDBObject.put()方法。
            request.onsuccess = function(event) {
                console.log('数据更新成功');
            }
            request.onerror = function(event) {
                console.log('数据更新失败');
            }
        }//更新数据记录
        function remove(key) {
            var request = db.transaction(['person'], 'readwrite')
                            .objectStore('person')
                            .delete(key);

            request.onsuccess = function(event) {
                console.log('数据记录删除成功');
            }
        }//删除数据记录
    }

    request.onerror = function(event) {
        
        console.log('数据库打开出错');
    }
}


  initDB();

//var objectStore = db.createObjectStore('person', {autoIncrement: true})
//如果数据记录里面没有合适作为主键的属性，那么可以让 IndexedDB 自动生成主键。
class IdxDB{
    constructor(DB_NAME){
        this.DB_NAME = DB_NAME;
        this.version = 1;
        this.initDB();
        this.db;
    }
    initDB() {
        let currentVersion = this.version;
        let request = window.indexedDB.open(this.DB_NAME, currentVersion);

        request.onupgradeneeded = e => {
            this.db = request.result;
            console.log('upgradeneeded...' + '当前数据库版本: '　+ currentVersion);

            request.onsuccess = e => {
                console.log('数据库打开成功');
                this.db.close();
                //不关闭会卡死
            }
            request.onerror = e => {
                console.log(e.currentTarget.error.message);
            }
        }    
        request.onblocked = e =>{
            console.log('init blocking...');
        }
    }
    createTable(DB_TABLE, options){
        
        this.version += 1;
        let currentVersion = this.version;
        let request = window.indexedDB.open(this.DB_NAME, currentVersion);
        
        request.onupgradeneeded = e => {
            this.db = e.target.result;
            
            console.log('upgradeneeded...' + '当前数据库版本: '　+ currentVersion);
            console.log('新增数据表' + DB_TABLE);
            
            if(!this.db.objectStoreNames.contains(DB_TABLE)){
                let objectStore = this.db.createObjectStore(DB_TABLE, options);
                objectStore.createIndex('name', 'name', {unique: true});
                request.onsuccess = e => {
                    this.db.close();
                    //不关闭会卡死
                }
            }
            request.onerror = e => {
                console.log(e.currentTarget.error.message);
            }
        }
        request.onblocked = e => {
            console.log('createTable is blocking...');
        } 
    }
    addData(DB_TABLE, options) {
        let opts = options || {};
        let request = window.indexedDB.open(this.DB_NAME);

        request.onsuccess = e => {
            this.db = e.target.result;
            let tran = this.db.transaction([DB_TABLE], 'readwrite')
                              .objectStore(DB_TABLE)
                              .add(opts);
        
          tran.onsuccess = function (event) {
            console.log('数据写入成功');
          };
          tran.onerror = function (event) {
            console.log('数据写入失败');
          }
        }
    }
    
}
let test = new IdxDB('test');
test.createTable('test01', {keypath: 'id', autoincrement: true});
test.addData('test01', {id: 1, name:'zhangsan', age: 25, email:'zhangsan@example.com'});
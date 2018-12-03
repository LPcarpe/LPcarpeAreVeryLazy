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
    createTable(DB_TABLE){
        this.version += 1;
        let currentVersion = this.version;
        let request = window.indexedDB.open(this.DB_NAME, currentVersion);
        
        request.onupgradeneeded = e => {
            this.db = e.target.result;
            let objectStore;
            console.log('upgradeneeded...' + '当前数据库版本: '　+ currentVersion);
            console.log('新增数据表' + DB_TABLE);
            
            if(!this.db.objectStoreNames.contains(DB_TABLE)){
                objectStore = this.db.createObjectStore(DB_TABLE, {keyPath: 'id', autoIncrement: true});
                objectStore.createIndex('name', 'name', {unique: true});
                objectStore.createIndex('emial', 'email', {unique: true});
               
                //(DB_TABLE，{KEY:{options}, index1:{options}, index2:{options}})
               
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
            console.log('blocking...');
        }
        
    }

}
var test = new IdxDB('test');
test.createTable('test01');
test.createTable('test02');
test.createTable('test03');
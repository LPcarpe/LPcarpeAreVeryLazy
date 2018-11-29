(function() {
    function IDB() {
        this.initDB('test');
       /*  this.createTable('test01'); */
    }
    IDB.prototype = {
        initDB: (DB_NAME) => {
            var request = window.indexedDB.open(DB_NAME, '1');
            this.db = null;
            this.dbExample = null;
            this.a = 'a';
            
            request.onsuccess = (event) => {
                this.db = event.result;
                console.log('数据库打开成功...');
                console.log(db);
            }
            request.onupgradeneeded = (event) =>{
                this.dbexmple = event.target.result;
                
                console.log("upgradeneed...");
            }
            request.onerror = (event) =>{
                console.log('数据库打开错误...');
            }
            request.onblocked = (event) =>{
                console.log('上一次的数据库链接还未关闭...');
            }
        }
        /* createTable: (table) => {
            var objectStore;
            if(!this.dbExample.objectStoreNames.contains(table)){
                objectStore = this.dbExample.createObjectStore(DB_TABLE, {keyPath: 'id', autoIncrement: true});
                objectStore.createIndex('name', 'name', {unique: true});
                objectStore.createIndex('emial', 'email', {unique: true});
            }
        } */

    }
    window['IDB'] = IDB;
})()
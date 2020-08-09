import Dexie from 'dexie';

const db = new Dexie('vPostDB');
db.version(1).stores({
    apiList: `gid,name,componentValue`
});

export default db;
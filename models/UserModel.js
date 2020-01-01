var db = require('../utils/db');

module.exports = {
    getById: (id) => {
        return db.query(`select * from users where id = ${id} and status = ${true}`);
    },
    getByEmail: (email) => {
        return db.query(`select * from users where email = '${email}' and status = ${1}`);
    },
    getAll: () => {
        return db.query('select * from users');
    },
    getCustomers: () => {
        return db.query(`select * from users where type = ${0}`);
    },
    getEmployees: () => {
        return db.query(`select * from users where type = ${1}`);
    },
    addUser: (user) => {
        return db.query(`INSERT INTO users(email,password,dial,address,status,type) VALUES ("${user.email}",'${user.password}','${user.dial}','${user.address}',1,1)`);  
    },
    updateUsers: (user) => {
        user.status = user.status == 0 ? user.status : 1;
        user.type = user.type == 0 ? user.type : 1;
        return db.query(`
        
        UPDATE users SET email='${user.email}',password='${user.password}',dial='${user.dial}',address='${user.address}',status=${user.status},type=${user.type} where id =${user.id}`);
    },
    deleteUsers: (id) => {        
        return db.query(`delete from users where id =${id}`);
    }
}
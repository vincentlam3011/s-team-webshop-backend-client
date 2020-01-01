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
    }
}
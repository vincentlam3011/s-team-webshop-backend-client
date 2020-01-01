var db = require('../utils/db');

module.exports = {
    getAll: () => {
        return db.query(`select * from categories where status = ${1}`);
    },
    getAllForAdmin: () => {
        return db.query(`select * from categories`);
    }
}
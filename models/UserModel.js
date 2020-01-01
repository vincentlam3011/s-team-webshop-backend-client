var db = require('../utils/db');

module.exports = {
    getAll: () => {
        return db.query('select * from users');
    }
}
var db = require('../utils/db');

module.exports = {
    getAllProducts: () => {
        let select = `select p.*, c.name as categoryName`;
        let from = `from products as p, categories as c`;
        let where = `where p.status = ${1} and c.status = ${1} and c.id = p.id`;
        let query = select + " " + from + " " + where;
        return db.query(query);
    },
}
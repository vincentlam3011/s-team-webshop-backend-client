var db = require('../utils/db');

module.exports = {
    getAllProducts: () => {
        let select = `select p.*, c.name as categoryName`;
        let from = `from products as p, categories as c`;
        let where = `where p.status = ${1} and c.status = ${1} and c.id = p.id`;
        let query = select + " " + from + " " + where;
        return db.query(query);
    },
    getAllForAdmin: () => {
        let select = `select p.*, c.name as categoryName`;
        let from = `from products as p, categories as c`;
        let where = `where c.id = p.id`;
        let query = select + " " + from + " " + where;
        return db.query(query);
    },
    getProductsByCategory: (id_category) => {
        let select = `select p.*, c.name as categoryName`;
        let from = `from products as p, categories as c`;
        let where = `where p.status = ${1} and c.status = ${1} and c.id = p.id_category and c.id = '${id_category}'`;
        let query = select + " " + from + " " + where;
        return db.query(query);
    },
    getProductsByQuery: (searchStr) => {
        let select = `select p.*, c.name as categoryName`;
        let from = `from products as p, categories as c`;
        let where = `where p.status = ${1} and c.status = ${1} and c.id = p.id_category and c.name like '%${searchStr}%' or p.name like '%${searchStr}%'`;
        let query = select + " " + from + " " + where;
        return db.query(query);
    }
}
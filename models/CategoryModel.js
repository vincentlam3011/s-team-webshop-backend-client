var db = require('../utils/db');

module.exports = {
    getAll: () => {
        return db.query(`select * from categories where status = ${1}`);
    },
    getAllForAdmin: () => {
        return db.query(`select * from categories`);
    },
    addcategory: (category) => {
        category.status = category.status == 0 ? 0 : 1;
        return db.query(`INSERT INTO categories(name,status) VALUES ("${category.name}",${category.status})`);
    },
    updateCategories: (category) => {
        category.status = category.status == 0 ? category.status : 1;
        return db.query(`
        
        UPDATE categories SET name='${category.name}',status=${category.status} where id =${category.id}`);
    },
    deleteCategories: (id) => {
        return db.query(`update categories set status = ${0} where id =${id}`);
    }
}
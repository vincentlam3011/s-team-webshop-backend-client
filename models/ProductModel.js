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
    },
    addProduct: (product) => {
        return db.query(`INSERT INTO products(id_category,name,imgUrl,description,price,status)VALUES(${product.id_category},'${product.name}','${product.imgUrl}','${product.description}',${product.price},1);`);
    },
    updateProduct: (product) => {
        product.status = product.status == 0 ? product.status : 1;
        
        return db.query(`
        
        UPDATE products SET id_category=${product.id_category},name='${product.name}',imgUrl='${product.imgUrl}',description='${product.description}',price=${product.price},status=${product.status} where id =${product.id}`);
    },
    deleteProduct: (id) => {        
        return db.query(`delete from products where id =${id}`);
    }
}
var db = require('../utils/db');

module.exports = {
    getAllByUser: (id) => {
        let select = `select u.email, i_d.*, p.name as productName`;
        let from = `from invoices as i, invoicedetails as i_d, users as u, products as p`;
        let where = `where i.id_customer = u.id and u.type = 0 and i_d.id_invoice = i.id and i_d.id_product = p.id and u.id = ${id};`
        let query = select + " " + from + " " + where;
        return db.query(query);
    }
}
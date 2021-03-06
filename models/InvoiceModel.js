var db = require('../utils/db');

module.exports = {
    getAllInvoices: () => {
        let select = `select inv.id, u.id as id_customer, u.*, p.id as id_product, p.name as productName, p.price as curPrice, p.id_category, c.name as categoryName
        , i.quantity, inv.createDate, inv.estimatedDeliveryDate, inv.total`;
        let from = `from invoiceDetails as i, products as p, categories as c, invoices as inv, users as u`;
        let where = `where p.id_category = c.id and i.id_product = p.id and i.id_invoice = inv.id and inv.id_customer = u.id`;
        let query = select + " " + from + " " + where;
        return db.query(query);
    },
    getAllByUser: (id) => {
        let select = `select u.email, i_d.*, p.name as productName`;
        let from = `from invoices as i, invoicedetails as i_d, users as u, products as p`;
        let where = `where i.id_customer = u.id and u.type = 0 and i_d.id_invoice = i.id and i_d.id_product = p.id and u.id = ${id};`
        let query = select + " " + from + " " + where;
        return db.query(query);
    },
    getInvoiceDetails: (id) => {
        let select = `select inv.id, u.id as id_customer, u.email, p.id as id_product, p.name as productName, p.price as curPrice, p.id_category, c.name as categoryName
                    , i.quantity, inv.createDate, inv.estimatedDeliveryDate, inv.total`;
        let from = `from invoiceDetails as i, products as p, categories as c, invoices as inv, users as u`;
        let where = `where inv.id_customer = ${id} and p.id_category = c.id and i.id_product = p.id and i.id_invoice = inv.id and inv.id_customer = u.id`;
        let query = select + " " + from + " " + where;
        return db.query(query);
    },
    addInvoices: (invoice) => {
        invoice.status = invoice.status == 0 ? 0 : 1;
        var query = `INSERT INTO invoices(id_customer,status,createDate,estimatedDeliveryDate,total) VALUES (${invoice.id_customer},${invoice.status},'${invoice.createDate}','${invoice.estimatedDeliveryDate}',${invoice.total});`
        invoice.products.forEach(element => {
            query += `INSERT INTO \`invoicedetails\` (id_product,id_invoice,quantity,singlePrice) SELECT ${element.id_product},MAX(invoices.id) ,${element.quantity},${element.quantity} FROM \`invoices\`;`
        });
        console.log('query:', query);
        return db.query(query);
    },
    updateInvoices: (invoice) => {
        invoice.status = invoice.status == 0 ? invoice.status : 1;
        return db.query(`
        
        UPDATE invoices SET name='${invoice.name}',status=${invoice.status} where id =${invoice.id}`);
    },
    createBlankInvoice: (id_customer) => {
        return db.query(`insert into invoices(id_customer, status) values(${id_customer}, ${1})`);
    },
    createInvoiceDetails: (id, productsList) => {
        let query = 'insert into invoiceDetails (id_product, id_invoice, quantity, singlePrice) values';
        let valueQuery = '';
        for (let i of productsList) {
            let value = `(${i.id_product}, ${id}, ${i.quantity}, ${i.singlePrice}),`;
            valueQuery += value;
        }
        console.log(valueQuery);
        query += valueQuery;
        query = query.slice(0, -1);
        console.log(query);
        return db.query(query);
    },
    getDetailsOfOneInvoice: (id) => {
        return db.query(`select i_d.*, i_d.singlePrice * i_d.quantity as total from invoiceDetails as i_d where i_d.id_invoice = ${id}`);
    },
    updateInvoiceTotalPrice: (id, total) => {
        return db.query(`update invoices set total = ${total}, status = ${2}, createDate = curdate(), estimatedDeliveryDate = DATE_ADD(curdate(), INTERVAL 3 DAY) where id = ${id}`);
    },
    deleteInvoices: (id) => {
        return db.query(`update invoices set status = ${0} where id =${id}`);
    }
}

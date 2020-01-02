var db = require('../utils/db');

module.exports = {
    getByUser: (id) => {
        return db.query(`select * from banking_cards where id_user = ${id}`);
    },
    addBlankCard: (id) => {
        return db.query(`insert into banking_cards(id_user) values(${id})`);
    },
    editCard: (id_user, cardNum, cardType) => {
        return db.query(`update banking_cards set type = ${cardType}, cardNum = ${cardNum} where id_user = ${id_user}`);
    }
}
var mysql = require('mysql');

var createConnection = () => {
    return mysql.createConnection({
        host: 'remotemysql.com',
        database: 'vzcyoeYJSx',
        port: '3306',
        user: 'vzcyoeYJSx',
        password: 'f5C58w9Nif',
        dateStrings: true,
        timezone: 'Z',

        typeCast: function castField(field, useDefaultTypeCasting) {

            if ((field.type === "BIT") && (field.length === 1)) {

                var bytes = field.buffer();

                return (bytes[0] === 1);

            }

            return (useDefaultTypeCasting());

        }
    })
}

module.exports = {
    query: sql => {
        return new Promise((resolve, reject) => {
            var connection = createConnection();
            connection.connect();
            connection.query(sql, (error, results, fields) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(results);
                }
                connection.end();
            });
        });
    },
}
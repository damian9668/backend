const knex = require("knex");

class SQLConnector {

    constructor(tabla, config) {
        this.tabla = tabla
        this.knex = knex(config)
    }
}
module.exports = SQLConnector
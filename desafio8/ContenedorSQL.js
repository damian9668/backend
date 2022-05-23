const knex = require("knex")

class ContenedorSQL {
    constructor(tabla, config) {
        this.tabla = tabla
        this.knex = knex(config)
    }

    async listar(id) {
        //console.log(response)
       return this.knex.select("*").from(this.tabla).where("id", id);

    }

    async listarAll() {
        return this.knex.select("*").from(this.tabla)
    }

    async guardarMensaje(elem) {

        try{
            const exists = await this.knex.schema.hasTable(this.tabla);

            if (!exists) {
                await this.knex.schema.createTable(this.tabla, table => {
                    table.increments("id")
                    table.string("correo")
                    table.string("mensaje")
                    table.string("date")
                })
            }


            const response = await this.knex(this.tabla).insert(elem);

            console.info('New entry created ', response);
        }catch(e){
            console.error(e);
        }
    }

    async guardarProducto(elem) {
        try {

            const exist = await this.knex.schema.hasTable(this.tabla)

            if (!exist) {
                await this.knex.schema.createTable(this.tabla, table => {
                    table.increments("id")
                    table.string("name")
                    table.integer("price")
                    table.string("url")
                })
            }
            const response = await this.knex(this.tabla).insert(elem)
            console.info('New entry created ', response);

        } catch (e) {
            console.error(e);
        }
    }

    async actualizar(elem, id) {
      return this.knex(this.tabla).update(elem).where("id",id)
    }


    async borrar(id) {
        return this.knex(this.tabla).where("id",id).del()
    }

    async borrarAll() {
        return this.knex(this.tabla).del()
    }

    async desconectar() {
        return this.knex.destroy()
    }
}

module.exports = ContenedorSQL
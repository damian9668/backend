const {options} = require("./mysqlDB");
const knex = require("knex")(options)

class ContenedorSQL {
    constructor(tabla){
        this.tabla = tabla
    }

    async listar(id) {

    }

    async listarAll() {

    }

    async guardarMensaje(elem) {

        knex.schema.hasTable(this.tabla).then(function(exists) {
            if (!exists) {
                knex.schema.createTable(this.tabla,table=>{
                    table.increments("id")
                    table.string("correo")
                    table.string("mensaje")
                    table.string("date")
                }).then(()=> console.log("tabla creada"))
                    .catch((err)=>{console.log(err);throw err})
                    .finally(()=>{
                        knex.destroy();
                    })
            }
        });

        knex(this.tabla).insert(elem)
            .then((data)=>console.log(data))
            .catch((err)=>{console.log(err);throw err})
            .finally(()=>{
                knex.destroy();
            })
    }

    async actualizar(elem, id) {

    }


    async borrar(id) {

    }

    async borrarAll() {

    }

    async desconectar() {

    }
}
module.exports = ContenedorSQL
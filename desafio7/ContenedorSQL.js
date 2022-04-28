const knex = require("knex")

class ContenedorSQL {
    constructor(tabla,config){
        this.tabla = tabla
        this.knex = knex(config)
    }

    async listar(id) {

    }

    async listarAll() {

    }

    async guardarMensaje(elem) {
        let tabla = this.tabla;
        let knex = this.knex;
        //console.log(tabla)
        knex.schema.hasTable(tabla).then(function(exists) {
            //console.log(exists)
            if (!exists) {
                knex.schema.createTable(tabla,table=>{
                    table.increments("id")
                    table.string("correo")
                    table.string("mensaje")
                    table.string("date")
                }).then(()=> console.log("tabla creada"))
                    .catch((err)=>{console.log(err);throw err})
                    .finally(()=>{
                        knex(tabla).insert(elem)
                            .then((data)=>console.log(data))
                            .catch((err)=>{console.log(err);throw err})
                            .finally(()=>{
                                knex.destroy();
                            })
                    })
            }else{
                knex(tabla).insert(elem)
                    .then((data)=>console.log(data))
                    .catch((err)=>{console.log(err);throw err})
                    .finally(()=>{
                        knex.destroy();
                    })
            }
        });
    }
    async guardarProducto(elem) {
        let tabla = this.tabla;
        let knex = this.knex
        knex.schema.hasTable(tabla).then(function(exists) {
            //console.log(exists)
            if (!exists) {
               // console.log(tabla)
                knex.schema.createTable(tabla,table=>{
                    table.increments("id")
                    table.string("name")
                    table.integer("price")
                    table.string("url")
                }).then(()=> console.log("tabla creada"))
                    .catch((err)=>{console.log(err);throw err})
                    .finally(()=>{
                        knex(tabla).insert(elem)
                            .then((data)=>console.log(data))
                            .catch((err)=>{console.log(err);throw err})
                            .finally(()=>{
                                knex.destroy();
                            })
                    })
            }else{
                knex(tabla).insert(elem)
                    .then((data)=>console.log(data))
                    .catch((err)=>{console.log(err);throw err})
                    .finally(()=>{
                        knex.destroy();
                    })
            }
        });
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
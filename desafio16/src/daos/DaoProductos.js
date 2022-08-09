import SQLConnector from "./connectors/SQLConnector";

let instance = null;

class DaoProductos extends SQLConnector{

    constructor() {
        super();
    }

    static getInstance(){
      if(!instance){
          instance=new DaoProductos()
      }
      return instance;
    }

    async listar(id){
        return this.knex.select("*").from(this.tabla).where("id", id);
    }
    async listarTodos(){
        return this.knex.select("*").from(this.tabla)
    }
    async guardar(elem){
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
    async actualizar(elem, id){
        return this.knex(this.tabla).update(elem).where("id",id)
    }
    async borrar(id){
        return this.knex(this.tabla).where("id",id).del()
    }
}

module.exports = DaoProductos
const {DaoProductos} = require("./DaoProductos")

class DaosFactory {

    async getDao (daoName){
        switch(daoName){
            case "producto":
                DaoProductos.getInstance()
                break;
            default:
                throw new Error("DAO Not Implemented");
        }
    }
}
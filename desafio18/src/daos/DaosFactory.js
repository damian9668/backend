const {DaoProductos, getInstance} = require("./DaoProductos")

class DaosFactory {

    getDao (daoName){
        switch(daoName){
            case "producto":
              return getInstance()
            default:
                throw new Error("DAO Not Implemented");
        }
    }
}
module.exports = DaosFactory;

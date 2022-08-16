require ("dotenv").config();
const minimist = require('minimist')

const DaosFactory = require("../daos/DaosFactory") ;

const factory = new DaosFactory()

const daoProducto = factory.getDao("producto");

async function ejecutarcmd(){
    const argv = minimist(process.argv.slice(2))
    const {cmd, id, nombre, precio, url} = argv
    const producto = {};
    try{
       switch (cmd.toLowerCase()){

           case 'agregar':
               console.log(cmd);

               producto.name = nombre
               producto.price = precio
               producto.url = url

               await daoProducto.guardar(producto);
               break;

           case'reemplazar':
               console.log(cmd);
               producto.name = nombre
               producto.price = precio
               producto.url = url
                try{
                    await daoProducto.actualizar(producto,id)
                    console.log("producto actualizado")
                }
                catch (e) {
                    console.log(e)
                }

               break;

           case 'borrar':
               console.log(cmd);
               try{
                   await daoProducto.borrar(id)
                   console.log("producto borrado")
               }
               catch (e) {
                   console.log(e)
               }

               break;

           case 'buscar':
               console.log(cmd);
               console.log(await daoProducto.listar(id));
               break;
       }
    }
    catch (e) {
        console.log(e)
    }
}
ejecutarcmd();
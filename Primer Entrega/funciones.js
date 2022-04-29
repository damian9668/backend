const fs = require('fs');



class Contenedor{
    constructor(nombre){
        this.archivo=nombre;
    }
    //no tocar
    async save(object){
        try{
            const contenido = await fs.promises.readFile(this.archivo,'utf8');
           // console.log(contenido)
            const info = JSON.parse(contenido);
            object.id=(info.length+1);
            object.timestamp = Date.now()
            info.push(object);
            await fs.promises.writeFile(this.archivo,JSON.stringify(info,null,2));
            console.log("el ID asignado es: "+object.id);
            return object.id;
        }catch(error){
            console.log(error);
        }
    }
    async saveCarrito(object){
        try{
            const contenido = await fs.promises.readFile(this.archivo,'utf8');
            // console.log(contenido)
            const info = JSON.parse(contenido);
            let carrito={}
            carrito.productos=[object]
            carrito.id=(info.length+1);
            carrito.timestamp = Date.now()
            info.push(carrito);
            await fs.promises.writeFile(this.archivo,JSON.stringify(info,null,2));
            console.log("el ID asignado es: "+carrito.id);
            return carrito.id;
        }catch(error){
            console.log(error);
        }
    }
    //no tocar
    async getById(id){
        try{
            const contenido = await fs.promises.readFile(this.archivo,'utf8');
            const info = JSON.parse(contenido);
            const response = info.find(element => element.id == id)
            return response;
        }catch(error){
            console.log(error);
            return {error:"no encontrado"};
        }
    }
    //no tocar
    async getAll(){
        try{
            const contenido = await fs.promises.readFile(this.archivo,'utf8');
            const info = JSON.parse(contenido);
            //console.log(info);
            return info;

        }catch(error){
            console.log(error);
        }
    }
    //no tocar
    async deleteById(id){
        try{
            const contenido = await fs.promises.readFile(this.archivo,'utf8');
            const info = JSON.parse(contenido);
            const index = info.findIndex(prod =>prod.id == id);

            if(index == -1){
                throw new Error("No Encontrado")
            }else{
                const result =  info.filter(objetos => objetos.id != id);
                await fs.promises.writeFile(this.archivo,JSON.stringify(result,null,2));
                return result;
            }
        }catch(error){
            console.log(error);
            return {error:error};
        }
    }

    async deleteAll(){
        try{
            const contenido = await fs.promises.readFile(this.archivo,'utf8');
            const info = JSON.parse(contenido);
            const result =  info.filter(objetos => objetos.id == 0);
            await fs.promises.writeFile(this.archivo,JSON.stringify(result,null,2));
            console.log(result);
            return result;

        }catch(error){
            console.log(error);
        }
    }
    //no tocar
    async updateById(id,updateProd){
        try{
            const contenido = await fs.promises.readFile(this.archivo,'utf8');
            const info = JSON.parse(contenido);
           // console.log(info);
            const index = info.findIndex(prod =>prod.id == id);

            if(index == -1){
                throw new Error("Producto No Encontrado")
            }else{
                updateProd.id=id;
                updateProd.timestamp=Date.now()
                info[index]=updateProd;
                console.log(index);
                await fs.promises.writeFile(this.archivo,JSON.stringify(info,null,2));
                //console.log(updateProd);
                return "OK";
            }
        }catch(error){
            console.log(error);
            return {error:"producto no encontrado"};
        }
    }
    async updateCarritoById(idCarrito,nuevoProducto){
        try{
            const contenido = await fs.promises.readFile(this.archivo,'utf8');
            const info = JSON.parse(contenido);
            //console.log(info);
            const index = info.findIndex(prod =>prod.id == idCarrito);
            info[index].productos.push(nuevoProducto)
            info[index].timestamp= Date.now()
           // console.log(info)
            await fs.promises.writeFile(this.archivo,JSON.stringify(info,null,2));
            return "OK";

        }catch(error){
            console.log(error);
            return {error:"producto no encontrado"};
        }
    }
    async deleteProdFromCarritoById(carrito,idProducto){
        try{
            const indexProd = carrito.productos.findIndex(prod =>prod.id == idProducto)

            if(indexProd == -1){
                throw new Error("Producto No Encontrado")
            }else{
                carrito.productos.splice(indexProd,1)
                const contenido = await fs.promises.readFile(this.archivo,'utf8');
                const info = JSON.parse(contenido);
                const index = info.findIndex(carritos =>carritos.id == carrito.id)
                info[index].productos = carrito.productos
                info[index].timestamp = Date.now();
                await fs.promises.writeFile(this.archivo,JSON.stringify(info,null,2));
                return "OK";
            }
        }catch (e){
            console.log(e);
            return {error:"producto no encontrado"};
        }



    }
}



module.exports = Contenedor
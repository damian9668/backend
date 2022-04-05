const fs = require('fs');

class Contenedor{
    constructor(nombre){
        this.archivo=nombre;
    }
    async save(object){
        try{
            const contenido = await fs.promises.readFile(this.archivo,'utf8');
            const info = JSON.parse(contenido);
            object.id=(info.length+1);
            info.push(object);
            await fs.promises.writeFile(this.archivo,JSON.stringify(info,null,2));
            console.log("el ID asignado es: "+object.id);
            return object;
        }catch(error){
            console.log(error);
        }
    }

    async getById(id){
        try{
            const contenido = await fs.promises.readFile(this.archivo,'utf8');
            const info = JSON.parse(contenido);
            let i=0;
            if (id > info.length){
                throw new Error("Ups");
            }
            for(i=0;i<info.length;i++){
                if(info[i].id == id){
                    console.log(info[i]);
                    return info[i];
                }
            }
        }catch(error){
            console.log(error);
            return {error:"producto no encontrado"};
        }
    }

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

    async deleteById(id){
        try{
            const contenido = await fs.promises.readFile(this.archivo,'utf8');
            const info = JSON.parse(contenido);

            const result =  info.filter(objetos => objetos.id != id);
            await fs.promises.writeFile(this.archivo,JSON.stringify(result,null,2));
            console.log(result);

            if (id > info.length){
                throw new Error("Ups");
            }
            return result;

        }catch(error){
            console.log(error);
            return {error:"producto no encontrado"};
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
    async updateById(id,updateProd){
        try{
            const contenido = await fs.promises.readFile(this.archivo,'utf8');
            const info = JSON.parse(contenido);
            if (id > info.length){
                throw new Error("Ups");
            }
            console.log(info);
            const index = info.findIndex(prod =>prod.id == id);
            updateProd.id=id;
            info[index]=updateProd;
            console.log(index);
            await fs.promises.writeFile(this.archivo,JSON.stringify(info,null,2));
            console.log(updateProd);
            return "OK";

        }catch(error){
            console.log(error);
            return {error:"producto no encontrado"};
        }
    }
}



module.exports = Contenedor
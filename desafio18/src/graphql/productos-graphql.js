const { ApolloServer, gql } = require('apollo-server-express');
const DaosFactory = require("../daos/DaosFactory") ;

const factory = new DaosFactory()

const daoProducto = factory.getDao("producto");

const typeDefs = gql`
    input Producto {
        name: String
        url: String
        price: Number
    }
    type Query{
        get(id:Number): Producto
    }
    type Mutation{
        save(input: Producto) : Producto
        update(input: Producto, id: Number) : Producto
        delete(id: Number) : Boolean
    }
`
const resolvers = {
    Query: {
        get: async (id)=>{
            try{
                return await daoProducto.listar(id);

            }catch (e) {
                console.log(e);
                return e;
            }
        }
    },
    Mutation:{
        save: async (input)=>{
            try{
                await daoProducto.guardar(input);
                return input;
            }catch (e) {
                console.log(e);
                return e;
            }
        },
        update: async (input, id)=>{
            try{

                await daoProducto.actualizar(input,id)
                return input;

            }catch (e) {
                console.log(e);
                return e;
            }
        },
        delete: async (id)=>{
            try{
                await daoProducto.borrar(id)
                return true;

            }catch (e) {
                console.log(e);
                return false;
            }
        }

    }
}

const server = new ApolloServer({typeDefs, resolvers});

module.exports = {
    server
}
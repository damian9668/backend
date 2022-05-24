const normalizr = require('normalizr');
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;

const schema = normalizr.schema;

const blogpost = {
    id:"mensaje",
    author:{
        id: "correo@test",
        nombre: "damian",
        apellido: "ullmann",
        edad: 25,
        alias: "fatman",
        avatar: "NO",
    },
    text:"hola dsadasdasd"
};

// Definir un esquema de usuarios (autores y comentarios)
const authorSchema = new schema.Entity('authors');

// Definir esquema de comentarios
const commentSchema = new schema.Entity('text');

// Definir un esquema de artículos
const postSchema = new schema.Entity('posts', {
    author: authorSchema,
    text: [commentSchema]
});

const util = require('util');

function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true));
}

console.log('------OBJETO NORMALIZADO----');
const normalizedData = normalize(blogpost, postSchema);
print(normalizedData);
console.log(JSON.stringify(normalizedData).length);

console.log('------OBJETO DESNORMALIZADO----');
const denormalizedData = denormalize(normalizedData.result, postSchema, normalizedData.entities);
print(denormalizedData);
console.log(JSON.stringify(denormalizedData).length);
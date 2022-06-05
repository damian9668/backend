const socket = io();
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;

const correo = document.getElementById("id");
const nombre = document.getElementById("userName");
const apellido = document.getElementById("userApellido");
const edad = document.getElementById("userEdad");
const alias = document.getElementById("userAlias");
const avatar = document.getElementById("userAvatar");
const datos = document.getElementById("mensaje");

const name = document.getElementById("name");
const price = document.getElementById("price");
const url = document.getElementById("url");

const schema = normalizr.schema;

const authorSchema = new schema.Entity('authors');


const textSchema = new schema.Entity('text');


const mensajeSchema = new schema.Entity('mensaje', {
    author: authorSchema,
    text: [textSchema]
});
const postSchema = new schema.Entity('posts', {
    posts: [mensajeSchema]
});


function enviarProductos (){
    //console.log("test")
    let producto={
        name:name.value,
        price: price.value,
        url: url.value
    }
    if(producto.name && producto.price && producto.url){
        socket.emit("producto",producto);
        document.getElementById("name").value = "";
        document.getElementById("price").value = "";
        document.getElementById("url").value = ""
    }
}

function enviarMensaje(){
    let fecha = Date()

    let mensaje = {
        id:"mensaje",
        author:{
            id: correo.value,
            nombre: nombre.value,
            apellido: apellido.value,
            edad: edad.value,
            alias: alias.value,
            avatar: avatar.value,
        },
        text: datos.value
    }
    if(mensaje.author.id && mensaje.text){
        const normalizedData = normalize(mensaje, mensajeSchema);
       // console.log(normalizedData);
        socket.emit('message', normalizedData);
        document.getElementById("mensaje").value = ""
    }

}

socket.on('productos', productos => {
    const htmlProductos = productos.map(
        producto => `<td>${producto.name}</td><td>$${producto.price}</td><td><img src=${producto.url} style="height: 60px; width: 60px"></td>`
    ).join('<tr>');
    document.querySelector('tbody').innerHTML = htmlProductos;
});

socket.on('messages', messages => {
    const denormalizedData = denormalize(messages.result, [postSchema], messages.entities);
    if (denormalizedData){
        let a = JSON.stringify(messages).length;
        let b = JSON.stringify(denormalizedData).length;
        let compresion = (b * 100)/a;
        //console.log(compresion);
        document.querySelector('h2').innerHTML = "Compresión: "+compresion;
        const htmlMessages = denormalizedData.map(
            message => `<a style="color: blue">${message.author.id}</a>: <a style="color: green">${message.text}</a> <img src=${message.author.avatar} style="height: 30px; width: 30px">`
        ).join('<br>');
        document.querySelector('p').innerHTML = htmlMessages;
    }

});
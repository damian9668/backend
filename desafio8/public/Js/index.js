const socket = io();

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


function enviarProductos (){
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
        socket.emit('message', mensaje);
        //console.log(mensaje)
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
    const htmlMessages = messages.map(
        message => `<a style="color: blue">${message.author.id}</a>: <a style="color: green">${message.text}</a> <img src=${message.author.avatar} style="height: 30px; width: 30px">`
    ).join('<br>');
    document.querySelector('p').innerHTML = htmlMessages;
});
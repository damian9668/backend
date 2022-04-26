const socket = io();

const correo = document.getElementById("correo");
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
        correo:correo.value,
        mensaje:datos.value,
        date: fecha.slice(0,24)
    }
    if(mensaje.correo && mensaje.mensaje){
        socket.emit('message', mensaje);
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
        message => `<a style="color: blue">${message.correo}</a>[<a style="color: saddlebrown">${message.date}</a>]: <a style="color: green">${message.mensaje}</a>`
    ).join('<br>');
    document.querySelector('p').innerHTML = htmlMessages;
});
const socket = io();

socket.on('productos', productos => {
    const htmlProductos = productos.map(
        producto => `<td id="${producto.id}-name">${producto.name}</td><td id="${producto.id}-price">$${producto.price}</td><td id="${producto.id}-url"><img src=${producto.url} style="height: 60px; width: 60px"></td><td><button class="btn btn-success mt-3 mb-5" id="${producto.id}" onclick="addCarrito(this)">Añadir</button></td>`
    ).join('<tr>');
    document.querySelector('tbody').innerHTML = htmlProductos;
});


let productosCarrito = [];
const addCarrito=(producto)=>{

    const name = document.getElementById(`${producto.id}-name`).innerText
    const price = document.getElementById(`${producto.id}-price`).innerText
    console.log(name,price);
    productosCarrito.push({name,price});
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${name}</td><td>${price}</td>`
    document.getElementById('carrito').append(tr);

}


const enviarPedido=async()=>{
    if(productosCarrito){
        try{
            await fetch('/carrito',{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method:'POST',body:JSON.stringify(productosCarrito)
            })
            productosCarrito=[];
            document.getElementById("carrito").innerHTML = ``
            // console.log(productosCarrito);
        }catch (e) {
            console.log(e);
            productosCarrito=[];
            document.getElementById("carrito").innerHTML = ``

        }
    }
}
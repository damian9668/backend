
function search(){
    const id = document.getElementById("id").value;
    window.location.replace("/api/productos/"+id);
}
function eliminar(){
    const id = document.getElementById("id2").value;
    fetch('http://localhost:8080/api/productos/'+id, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json'
        }
    })
}
function update(){
    const id = document.getElementById("id3").value;
    const titulo = document.getElementById("titulo").value;
    const precio = document.getElementById("precio").value;
    const urlImag = document.getElementById("urlImag").value;

    fetch('http://localhost:8080/api/productos/'+id, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(
            { title: titulo,
                    price: precio,
                    thumbnail:urlImag}
        )
    })
}


function search(){
    const id = document.getElementById("id").value;
    window.location.replace("/api/productos/"+id);
}
async function enviar(){
    const id = document.getElementById("id").value

    fetch('/api/productos/' + id, {
        method: 'PUT',
    })
}

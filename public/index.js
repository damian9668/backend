
function search(){
    const id = document.getElementById("id").value;
    window.location.replace("/api/productos/"+id);
}


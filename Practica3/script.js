function saludo(){
    let input = document.getElementById("nombre").value.trim();
    let imagen = document.getElementById("alejandro");

    if (input === ""){
        alert("No pusiste ningún nombre")
        imagen.src = "./Christian.png"
    } else{
        alert("Bienvenid@ a mi Práctica 3: " + input)
        imagen.src = "./Avengers Unidos.png"
    }
}
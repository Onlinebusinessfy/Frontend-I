const ciudades = [
    "Madrid",
    "Chula Vista",
    "Cancún",
    "Tijuana",
    "Tecate"
]

ciudades.forEach(ciudad => {
    console.log(ciudad);
})

document.getElementById('mostrarCiudades').addEventListener("click", () => {

    const ul = document.createElement("ul");

    ciudades.forEach(ciudad => {
        const li = document.createElement("li");
        li.textContent = ciudad;
        li.style.color = "red";
        ul.appendChild(li);
    });

    document.body.appendChild(ul)
})
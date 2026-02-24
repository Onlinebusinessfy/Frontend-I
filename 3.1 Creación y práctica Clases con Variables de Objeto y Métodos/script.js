class Producto{
    constructor(nombre, precio, categoria){
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        
    }
    mostrarDetalle(){
        return `Nombre: ${this.nombre} - Precio: ${this.precio} - Categoria: ${this.categoria}`;
    }
}

const productos = [
    new Producto("Ipad", 3500, "Tecnologia"),
    new Producto("Cachucha", 500, "Ropa"),
    new Producto("PC Gamer", 20000, "Tecnologia"),
    new Producto("Peine", 100, "Cosmetica"),
    new Producto("Iphone", 5000, "Tecnologia"),
    new Producto("Camisa", 800, "Ropa"),
    new Producto("Mochila", 1300, "Accesorios"),
    new Producto("Reloj", 2500, "Accesorios"),
    new Producto("Pelota", 900, "Deporte"),
    new Producto("Pantalon", 1250, "Ropa")
];

const boton = document.getElementById("resultado");

// boton.addEventListener("click", function(){
//     const producto1 = new Producto("Laptop", 15000, "Computo");
//     const detalle = producto1.mostrarDetalle();
//     document.getElementById("producto").innerText=detalle;
// })

boton.addEventListener("click", function(){
    const random = Math.floor(Math.random()*productos.length);
    const productoRandom = productos[random];

    document.getElementById("producto").innerText=productoRandom.mostrarDetalle();
});
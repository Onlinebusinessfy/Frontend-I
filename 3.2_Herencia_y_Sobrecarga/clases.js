class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }

    mostrarDetalle() {
        return `Producto: ${this.nombre} <br>
                Precio: $${this.precio}`;
    }
}

class ProductoElectronico extends Producto {
    constructor(nombre, precio, garantia) {
        super(nombre, precio);
        this.garantia = garantia;
    }

    mostrarDetalle() {
        return `${super.mostrarDetalle()} <br>
                Garantía: ${this.garantia} meses`;
    }
}

function mostrarProducto() {
    const productos = [
        new ProductoElectronico("Laptop Gamer", 25000, 24),
        new ProductoElectronico("Iphone", 18000, 6),
        new ProductoElectronico("Teclado", 300, 8)
    ];

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    productos.forEach(producto => {
        resultado.innerHTML += producto.mostrarDetalle() + "<hr>";
    });
}
let productos = {
    electronica: [
        { nombre: "Laptop", precio: 1400, stock: 3 },
        { nombre: "Celular", precio: 900, stock: 50 },
        { nombre: "Pila", precio: 20, stock: 20 }
    ],
    comida: [
        { nombre: "Pizza", precio: 15, stock: 7 },
        { nombre: "Hamburguesa", precio: 8, stock: 10 },
        { nombre: "Noodles", precio: 2, stock: 70 }
    ],
    ropa: [
        { nombre: "Camisa", precio: 5, stock: 17 },
        { nombre: "Pantalón", precio: 12, stock: 16 },
        { nombre: "Short", precio: 3, stock: 14 }
    ]
};

for (let categoria in productos) {
    console.log("Categoría:", categoria);
    productos[categoria].forEach(producto => {
        console.log(producto);
    });
}

const selectCategorias = document.getElementById("categorias");
const listaProductos = document.getElementById("listaProductos");
const btnExportar = document.getElementById("exportar");
const inputImportar = document.getElementById("importar");

function cargarCategorias() {
    selectCategorias.innerHTML = '<option value="">Selecciona una categoría</option>';

    for (let categoria in productos) {
        const option = document.createElement("option");
        option.value = categoria;
        option.textContent = categoria;
        selectCategorias.appendChild(option);
    }
}

cargarCategorias();

selectCategorias.addEventListener("change", () => {
    const categoria = selectCategorias.value;
    listaProductos.innerHTML = "";

    if (!categoria) return;

    productos[categoria].forEach(producto => {
        const li = document.createElement("li");
        li.textContent = `Nombre: ${producto.nombre} | Precio: $${producto.precio} | Stock: ${producto.stock}`;
        listaProductos.appendChild(li);
    });
});

btnExportar.addEventListener("click", () => {
    const data = JSON.stringify(productos, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "productos.json";
    a.click();

    URL.revokeObjectURL(url);
});

inputImportar.addEventListener("change", (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    const reader = new FileReader();

    reader.onload = (event) => {
        const datosImportados = JSON.parse(event.target.result);

        for (let categoria in datosImportados) {
            productos[categoria] = datosImportados[categoria];
        }

        cargarCategorias();
        listaProductos.innerHTML = "";
    };

    reader.readAsText(archivo);
});

class Empleado {
    constructor(nombre, puesto, salario, identificador) {
        this.nombre = nombre;
        this.puesto = puesto;
        this.salario = salario;
        this.identificador = identificador;
    }
}

class Tienda {
    constructor() {
        this.empleados = JSON.parse(localStorage.getItem("empleados")) || [];
    }

    guardar() {
        localStorage.setItem("empleados", JSON.stringify(this.empleados));
    }

    agregarEmpleado(nombre, puesto, salario, identificador) {
        const nuevo = new Empleado(nombre, puesto, salario, identificador);
        this.empleados.push(nuevo);
        this.guardar();
    }

    eliminarEmpleado(identificador) {
        this.empleados = this.empleados.filter(e => e.identificador !== identificador);
        this.guardar();
    }

    obtenerEmpleados() {
        return this.empleados;
    }

    filtrarEmpleados(puesto) {
        return this.empleados.filter(e => e.puesto === puesto);
    }

    ordenarEmpleadosPorSalario() {
        return [...this.empleados].sort((a, b) => b.salario - a.salario);
    }
}

const tienda = new Tienda();

let resultado;

window.onload = () => {
    resultado = document.getElementById("resultado");
    mostrar();
};

function render(lista) {
    if (!resultado) return;

    if (lista.length === 0) {
        resultado.innerHTML = `<p class="text-danger">No hay empleados registrados.</p>`;
        return;
    }

    resultado.innerHTML = lista.map(e => `
        <div class="card p-3 mb-2 shadow-sm">
            <strong>${e.nombre}</strong><br>
            Puesto: ${e.puesto}<br>
            Salario: $${e.salario}<br>
            ID: ${e.identificador}
        </div>
    `).join("");
}

function agregar() {
    const nombre = document.getElementById("nombre").value;
    const puesto = document.getElementById("puesto").value;
    const salario = document.getElementById("salario").value;
    const id = document.getElementById("identificador").value;

    if (!nombre || !puesto || !salario || !id) {
        alert("Completa todos los campos");
        return;
    }

    tienda.agregarEmpleado(nombre, puesto, parseFloat(salario), id);
    mostrar();

    nombre.value = "";
    puesto.value = "";
    salario.value = "";
    id.value = "";
}

function eliminar() {
    const id = document.getElementById("identificador").value;

    if (!id) {
        alert("Ingresa el ID a eliminar");
        return;
    }

    tienda.eliminarEmpleado(id);
    mostrar();
}

function mostrar() {
    render(tienda.obtenerEmpleados());
}

function filtrar() {
    const puesto = document.getElementById("puesto").value;

    if (!puesto) {
        alert("Ingresa un puesto para filtrar");
        return;
    }

    const lista = tienda.filtrarEmpleados(puesto);

    if (lista.length === 0) {
        resultado.innerHTML = `<p class="text-warning">No hay resultados para ese puesto.</p>`;
        return;
    }

    render(lista);
}

function ordenar() {
    render(tienda.ordenarEmpleadosPorSalario());
}
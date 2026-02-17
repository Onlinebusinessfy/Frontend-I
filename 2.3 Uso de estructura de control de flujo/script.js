let numerosEvaluados = [];

function evaluarNumero(numero) {

    if (numero < 0) {
        return { mensaje: "Número negativo", color: "red" };
    }
    else if (numero >= 0 && numero <= 10) {
        return { mensaje: "Número pequeño", color: "blue" };
    }
    else if (numero >= 11 && numero <= 50) {
        return { mensaje: "Número mediano", color: "orange" };
    }
    else {
        return { mensaje: "Número grande", color: "green" };
    }
}

function procesarNumero() {

    const input = document.getElementById("numeroInput");
    const resultado = document.getElementById("resultado");
    const historial = document.getElementById("historial");

    let valor = input.value.trim();

    if (valor === "") {
        resultado.textContent = "Por favor ingresa un número";
        resultado.style.color = "black";
        return;
    }

    if (isNaN(valor)) {
        resultado.textContent = "Entrada no válida";
        resultado.style.color = "black";
        return;
    }

    let numero = Number(valor);

    if (numero > 1000) {
        resultado.textContent = "Número demasiado alto";
        resultado.style.color = "black";
        return;
    }

    const evaluacion = evaluarNumero(numero);

    resultado.textContent = evaluacion.mensaje;
    resultado.style.color = evaluacion.color;

    numerosEvaluados.push(numero);

    const li = document.createElement("li");
    li.textContent = numero;
    historial.appendChild(li);

    actualizarEstadisticas();
}


function actualizarEstadisticas() {

    const contador = document.getElementById("contador");
    const mayorNumero = document.getElementById("mayorNumero");

    contador.textContent =
        "Cantidad evaluada: " + numerosEvaluados.length;

    if (numerosEvaluados.length > 0) {
        let mayor = Math.max(...numerosEvaluados);
        mayorNumero.textContent =
            "Número mayor ingresado: " + mayor;
    }
}


function limpiar() {

    document.getElementById("numeroInput").value = "";
    document.getElementById("resultado").textContent = "";
    document.getElementById("historial").innerHTML = "";
    document.getElementById("contador").textContent = "";
    document.getElementById("mayorNumero").textContent = "";

    numerosEvaluados = [];
}

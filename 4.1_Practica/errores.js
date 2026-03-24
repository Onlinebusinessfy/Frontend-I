function camposVacios(num1, num2) {
    if (num1 === '' || num2 === '') {
        throw new Error("Los campos no pueden estar vacíos");
    }
}

calcularOperacion = (operacion, num1, num2) => {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        throw new Error("Los parámetros deben ser números");
    }

    switch (operacion) {
        case 'suma':
            return num1 + num2;
        case 'resta':
            return num1 - num2;
        case 'multiplicacion':
            return num1 * num2;
        case 'division':
            if (num2 === 0) {
                throw new Error("El divisor no puede ser cero");
            }
            return num1 / num2;
        default:
            throw new Error("Operación no válida");
    }
};

let historial = [];

const btn = document.getElementById("btn");
const resultadoDiv = document.getElementById("resultado");
const historialDiv = document.getElementById("historial");

btn.addEventListener("click", () => {
    try {
        let num1 = document.getElementById("num1").value;
        let num2 = document.getElementById("num2").value;
        let operacion = document.getElementById("operacion").value;

        camposVacios(num1, num2);

        num1 = parseFloat(num1);
        num2 = parseFloat(num2);

        num1 = parseFloat(num1);
        num2 = parseFloat(num2);

        if (Number.isNaN(num1) || Number.isNaN(num2)) {
            throw new Error("Los valores deben ser números válidos");
        }

        const resultado = calcularOperacion(operacion, num1, num2);

        resultadoDiv.className = "success";
        resultadoDiv.textContent = `Resultado: ${resultado}`;

        const registro = `${num1} ${operacion} ${num2} = ${resultado}`;
        historial.push(registro);
        mostrarHistorial();

    } catch (error) {
        resultadoDiv.className = "error";
        resultadoDiv.textContent = error.message;

        console.error("Error técnico:", error);

    } finally {
        console.log("Operación finalizada");
    }
});

function mostrarHistorial() {
    historialDiv.innerHTML = "<h3>Historial</h3>";
    historial.forEach(op => {
        const p = document.createElement("p");
        p.textContent = op;
        historialDiv.appendChild(p);
    });
}
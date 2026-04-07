// Importar módulos
const fs = require('fs');
const readline = require('readline');

// Configurar entrada por consola
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Arreglo para guardar nombres
let nombres = [];

// Función para pedir nombres
function pedirNombres() {

    function preguntar() {
        if (nombres.length < 5) {
            rl.question(`Ingresa nombre ${nombres.length + 1}: `, (nombre) => {

                // Validar vacío
                if (nombre.trim() === "") {
                    console.log("No puede estar vacío");
                }
                // Validar duplicados
                else if (nombres.includes(nombre.trim())) {
                    console.log("Nombre duplicado");
                }
                else {
                    nombres.push(nombre.trim());
                }

                preguntar();
            });
        } else {
            // Guardar nombres en archivo
            fs.writeFileSync('datos.txt', nombres.join('\n'));
            console.log("\nNombres guardados en datos.txt\n");

            // Procesar archivo
            procesarArchivo();

            rl.close();
        }
    }

    preguntar();
}

// Procesar el archivo
function procesarArchivo() {

    // Validar si existe el archivo
    if (!fs.existsSync('datos.txt')) {
        console.log("Error: El archivo datos.txt no existe.");
        return;
    }

    // Leer archivo
    const contenido = fs.readFileSync('datos.txt', 'utf-8');

    // Validar si está vacío
    if (contenido.trim() === "") {
        console.log("El archivo está vacío.");
        return;
    }

    console.log("Contenido del archivo:\n");
    console.log(contenido);

    // Convertir a lista
    const lista = contenido.split('\n');

    // Convertir a mayúsculas
    const mayus = lista.map(n => n.toUpperCase());

    console.log("\nNombres en MAYÚSCULAS:");
    mayus.forEach(n => console.log(n));

    // Total de nombres
    const total = lista.length;

    // Nombre más largo
    const largo = lista.reduce((a, b) => a.length > b.length ? a : b);

    // Ordenar alfabéticamente
    const ordenados = [...lista].sort();

    console.log("\nResultados:");
    console.log("Total:", total);
    console.log("Nombre más largo:", largo);
    console.log("Ordenados:", ordenados);

    // Se guarda el resultado en un nuevo archivo
    fs.writeFileSync('resultado.txt', `
=== LISTA ORIGINAL ===
${lista.join('\n')}

=== MAYÚSCULAS ===
${mayus.join('\n')}

=== ORDENADOS ===
${ordenados.join('\n')}

== LARGO ===
${largo}

=== TOTAL ===
${total}
`);

    console.log("\nResultados guardados en resultado.txt");
}

// Se ejecuta el programa
pedirNombres();
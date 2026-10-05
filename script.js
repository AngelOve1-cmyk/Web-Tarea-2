const cantidad = document.getElementById("cantidad");
const monedaOrigen = document.getElementById("monedaOrigen");
const monedaDestino = document.getElementById("monedaDestino");
const botonConvertir = document.getElementById("convertir");
const resultado = document.getElementById("resultado");

botonConvertir.addEventListener("click", convertirMoneda);

async function convertirMoneda() {

    const valor = parseFloat(cantidad.value);
    const origen = monedaOrigen.value;
    const destino = monedaDestino.value;

    if (isNaN(valor) || valor <= 0) {
        alert("Ingresa una cantidad válida.");
        return;
    }

    if (origen === destino) {
        resultado.innerHTML = `
            <span>Resultado</span>
            <h2>${valor.toFixed(2)} ${destino}</h2>
            <small>Las monedas seleccionadas son iguales.</small>
        `;
        return;
    }

    resultado.innerHTML = `
        <span>Resultado</span>
        <h2>Calculando...</h2>
    `;

    try {

        const respuesta = await fetch(
            `https://api.frankfurter.dev/v2/rate/${origen}/${destino}`
        );

        if (!respuesta.ok) {
            throw new Error("No se pudo obtener la tasa de cambio.");
        }

        const datos = await respuesta.json();

        const conversion = valor * datos.rate;

        resultado.innerHTML = `
            <span>Resultado</span>

            <h2>
                ${conversion.toLocaleString("es-DO", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })} ${destino}
            </h2>

            <small>
                1 ${origen} = ${datos.rate.toFixed(4)} ${destino}
            </small>
        `;

    } catch (error) {

        resultado.innerHTML = `
            <span>Resultado</span>
            <h2>Error al consultar el servicio</h2>
            <small>Intenta nuevamente.</small>
        `;

        console.error(error);
    }
}
var programaFinal;

function pagar() {
    metodo = document.getElementById('TipoP').value;
    nombreP = programaFinal[0].prog_nombre;
    infoP = programaFinal[0].prog_descr;
    valorP = programaFinal[0].prog_costo;

    document.getElementById('seccionInferior').innerHTML = `
        <h1>Recibo de pago</h1>
        <p>Metodo de pago utilizado: ${metodo}</p>
        <p>Valor total pagado: ${valorP}</p>
        <p>Carrera escogida: ${nombreP}</p>
        <p>Información de la carrera:</p>
        <div class="bloquinfo">
            <p>${infoP}</p>
        </div>
  `;

  const paso = {prog_id: null, paso: 3}
  const pasoJson = JSON.stringify(paso);

  fetch("http://127.0.0.1:3000/updatePaso", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: pasoJson,
  }).then((result) => {
    console.log("Termine paso 3.");
    window.location.href = "portal.html";
  });
}

async function obtenerPrograma() {
    const programa = await fetch("http://127.0.0.1:3000/obtenerInfoPrograma");
    programaJson = await programa.json();
    programaFinal = programaJson;

    nombreP = programaJson[0].prog_nombre;
    valorP = programaJson[0].prog_costo;

    document.getElementById('pagoId').innerHTML = `
        <p>Monto a pagar: ${valorP}</p>
        <p>Programa a cursar: ${nombreP}</p>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
    obtenerPrograma();
});
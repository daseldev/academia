var programasJson;

async function enviar(progID) {
  const paso = {prog_id: progID, paso: 2}
  const pasoJson = JSON.stringify(paso);

  fetch("http://127.0.0.1:3000/updatePaso", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: pasoJson,
  }).then((result) => {
    console.log("Termine paso 2.");
    window.location.href = "portal.html";
  });
  
}

async function cambiarContenido(index) {
  ind = index;
  const informacion = programasJson[index].prog_descr;
  const carrera = programasJson[index].prog_nombre;
  const id = programasJson[index].prog_id;
  const requerimientos = await obtenerRequerimientos(id);
  const asignaturas = await obtenerAsignaturas(id);

  document.getElementById('right-section').innerHTML = `
      <h2>Formulario</h2>
      <p>Llenar este formulario para la carrera de ${carrera}.</p>
      <form id= formCar>
        ${requerimientos}
      </form>
      <li class="button" onclick="enviar('${id}')">Envíar</li>
  `;

  document.getElementById('bottom-section').innerHTML = `
      <h2>Información del Programa</h2>
      <p>${informacion}</p>
  `;

  document.getElementById('nav').innerHTML = `
    <h3>Asignaturas</h3>
    <li>
      ${asignaturas}
    </li>
  `;
}

async function obtenerRequerimientos(prog_id) {
  let cadena = '';

  const reqs = await fetch("http://127.0.0.1:3000/obtenerRequerimientos?progId=" + prog_id);
  reqsJson = await reqs.json();

  reqsJson.forEach((req) => {
    cadena += '<li><label for="req">' + req.req_nombre + ': </label><button type="submit">Subir</button></li>'
  });
  return cadena;
}

async function obtenerAsignaturas(prog_id) {
  let cadena = '';

  const asigs = await fetch("http://127.0.0.1:3000/obtenerAsignaturas?progId=" + prog_id);
  asigsJson = await asigs.json();

  asigsJson.forEach((asignatura) => {
    cadena += '<div class="button" onclick="cambiarContenido()">'+ asignatura.asign_nombre + ' - ' + asignatura.area_formacion + ' cr.: ' + asignatura.carga_horaria + '</div>'
  });
  return cadena;
}

async function obtenerProgramas() {
  let cadena = '';

  const programas = await fetch("http://127.0.0.1:3000/obtenerProgramas");
  programasJson = await programas.json();
  var c = 0;

  programasJson.forEach((prog) => {
    cadena += '<li class="button" onclick="cambiarContenido(' + "'" + c + "'" + ')">' + prog.prog_nombre + '</li>'
    c += 1;
  });

  console.log(programasJson);

  document.getElementById('left-section').innerHTML = `
    <h3>Programas</h3>
    <ul>
      ${cadena}
    </ul>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  obtenerProgramas();
});
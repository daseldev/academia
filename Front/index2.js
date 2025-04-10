async function refreshTable(link, table) {
  const people = await getPeopleFromAPI(link);
  drawPeopleTable(people, table);
}

async function getPeopleFromAPI(link) {
  const response = await fetch(link);
  const people = await response.json();
  return people;
}

async function drawPeopleTable(people, table) {
  document.getElementById(table).innerHTML = "";
  people.forEach((person) => {
    addPersonToTable(person, table);
  });
}

const form_programas = document.getElementById("programaForm");

form_programas.addEventListener("submit", (event) => {
  event.preventDefault();
  if (document.getElementById("programa").value != "todo") {
    refreshTable(
      "http://127.0.0.1:3000/filtrarPrograma2?programa=" +
        document.getElementById("programa").value,
      "programasDataTableTbody"
    );
  } else {
    refreshTable("http://127.0.0.1:3000/programas2", "programasDataTableTbody");
  }
});

const form_programasAsig = document.getElementById("programaAsigForm");

form_programasAsig.addEventListener("submit", (event) => {
  event.preventDefault();
  refreshTable(
    "http://127.0.0.1:3000/programaAsig?programa=" +
      document.getElementById("programaAsig").value,
    "asigDataTableTbody"
  );
});

const form = document.getElementById("agregarProgramaForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  refreshTable(
    "http://127.0.0.1:3000/agregarPrograma?prog_ID=" +
      document.getElementById("ID").value +
      "?prog_nombre=" +
      document.getElementById("nombre").value +
      "?prog_descr=" +
      document.getElementById("descripcion").value +
      "?prog_costo=" +
      document.getElementById("costo").value,
    "insXprogTbody"
  );
});

function addPersonToTable(person, table) {
  const personDataTable = document.getElementById(table);

  if (table == "programasDataTableTbody") {
    const row = personDataTable.insertRow(-1);

    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);

    cell1.innerHTML = person.prog_id;
    cell2.innerHTML = person.prog_nombre;
    cell3.innerHTML = person.prog_descr;
    cell4.innerHTML = person.prog_costo;
    cell5.innerHTML = person.requisitos;
  } else if (table == "asigDataTableTbody"){
    const row = personDataTable.insertRow(-1);

    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(2);

    cell1.innerHTML = person.asign_id;
    cell2.innerHTML = person.area_nombre;
    cell3.innerHTML = person.asign_nombre;
    cell4.innerHTML = person.carga_horaria;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  refreshTable("http://127.0.0.1:3000/programas2", "programasDataTableTbody");
  cargarFiltroProgramas();
  cargarListaReq();
});

async function cargarFiltroProgramas() {
  const response = await fetch("http://127.0.0.1:3000/programas?op=2");
  const programa = await response.json();

  var programaSelect = document.getElementById("programa");
  var programaAsigSelect = document.getElementById("programaAsig");
  // Agregar las opciones al elemento select
  programa.forEach(function (programa) {
    var option = document.createElement("option");
    option.value = programa.programa;
    option.text = programa.programa;
    programaSelect.add(option);

    var option2 = document.createElement("option");
    option2.value = programa.programa;
    option2.text = programa.programa;
    programaAsigSelect.add(option2);
  });
}

async function cargarListaReq() {
  const response = await fetch("http://127.0.0.1:3000/requerimientos");
  const requerimientos = await response.json();

  var selectRequerimientos = document.getElementById("requerimientos");
  var selectRequerimientos2 = document.getElementById("requerimientosu");
  // Agregar las opciones al elemento select
  requerimientos.forEach(function (requerimiento) {
    var option = document.createElement("option");
    option.value = requerimiento.req_id;
    option.text = requerimiento.req_id + " - " + requerimiento.req_nombre;
    selectRequerimientos.add(option);

    var option2 = document.createElement("option");
    option2.value = requerimiento.req_id;
    option2.text = requerimiento.req_id + " - " + requerimiento.req_nombre;
    selectRequerimientos2.add(option2);
  });
}

async function actualizarPrograma() {
  const programaData = {
    prog_id: document.getElementById("IDu").value,
    prog_nombre: document.getElementById("nombreu").value,
    prog_descr: document.getElementById("descripcionu").value,
    prog_costo: document.getElementById("costou").value,
  };

  var selectRequerimientos = document.getElementById("requerimientosu");
  var reqSeleccionados = [];
  for (var i = 0; i < selectRequerimientos.options.length; i++) {
    var opcion = selectRequerimientos.options[i];
    if (opcion.selected) {
      reqSeleccionados.push(opcion.value);
    }
  }

  const datosCombinados = {
    ...programaData,
    requerimientos: reqSeleccionados,
  };

  const programaDataJson = JSON.stringify(datosCombinados);

  fetch("http://127.0.0.1:3000/actualizarPrograma", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: programaDataJson,
  }).then((result) => {
    document.getElementById("actualizarProgramaForm").reset();
  });
}

async function agregarPrograma() {
  const programaData = {
    prog_id: document.getElementById("ID").value,
    prog_nombre: document.getElementById("nombre").value,
    prog_descr: document.getElementById("descripcion").value,
    prog_costo: document.getElementById("costo").value,
  };

  var selectRequerimientos = document.getElementById("requerimientos");
  var reqSeleccionados = [];
  for (var i = 0; i < selectRequerimientos.options.length; i++) {
    var opcion = selectRequerimientos.options[i];
    if (opcion.selected) {
      reqSeleccionados.push(opcion.value);
    }
  }

  const datosCombinados = {
    ...programaData,
    requerimientos: reqSeleccionados,
  };

  const programaDataJson = JSON.stringify(datosCombinados);

  fetch("http://127.0.0.1:3000/agregarPrograma", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: programaDataJson,
  }).then((result) => {
    document.getElementById("agregarProgramaForm").reset();
  });
}

async function actualizarAsignatura() {
  const asignaturaData = {
    id: document.getElementById("IDau").value,
    programa: document.getElementById("programaAsig").value,
    area: document.getElementById("areau").value,
    nombre: document.getElementById("nombreAsigu").value,
    carga: document.getElementById("cargaAsigu").value,
  };

  const asignaturaDataJson = JSON.stringify(asignaturaData);

  fetch("http://127.0.0.1:3000/actualizarAsignatura", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: asignaturaDataJson,
  }).then((result) => {
    document.getElementById("updateAsignaturaForm").reset();
  });
}

async function agregarAsignaturas() {
  const asignaturaData = {
    programa: document.getElementById("programaAsig").value,
    area: document.getElementById("area").value,
    nombre: document.getElementById("nombreAsig").value,
    carga: document.getElementById("cargaAsig").value,
  };

  const asignaturaDataJson = JSON.stringify(asignaturaData);

  fetch("http://127.0.0.1:3000/agregarAsignatura", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: asignaturaDataJson,
  }).then((result) => {
    document.getElementById("asignaturaForm").reset();
  });
}

async function eliminarPrograma() {
  const idData = {
    prog_id: document.getElementById("IDe").value,
  };

  const idDataJson = JSON.stringify(idData);

  fetch("http://127.0.0.1:3000/eliminarPrograma", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: idDataJson,
  }).then((result) => {
    document.getElementById("deleteProgramaForm").reset();
  });
}

async function eliminarAsignatura() {
  const idData = {
    asign_id: document.getElementById("IDda").value,
  };

  const idDataJson = JSON.stringify(idData);

  fetch("http://127.0.0.1:3000/eliminarAsignatura", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: idDataJson,
  }).then((result) => {
    document.getElementById("deleteAsigForm").reset();
  });
}

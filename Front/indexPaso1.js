var dtam = 1;
var ttam = 1;

async function guardarPaso1() {
    //Direcciones:
    guardarPaso1Dir(1);
    if (dtam >= 2) { guardarPaso1Dir(2); }
    if (dtam == 3) { guardarPaso1Dir(3); }

    //Teléfonos
    guardarPaso1Tel(1);
    if (ttam >= 2) { guardarPaso1Tel(2); }
    if (ttam == 3) { guardarPaso1Tel(3); }

    const lista = await fetch("http://127.0.0.1:3000/getMaxIns");
    const insIdDB = await lista.json();
    const insMaxId = parseInt(insIdDB[0].vmax);
  
    var id = 1;
    if (insMaxId >= 1) { id = insMaxId + 1; }
  
    console.log("id Inscripcion = " + id);

    const userData = {
        insId: id,
        prog_id: null,
        asp_id: null,
        paso1: "Hecho",
        paso2: "Sin empezar",
        paso3: "Sin empezar",
        periodo: "2024-I"
    }

    const userDataJson = JSON.stringify(userData);
    console.log(userDataJson);

    fetch("http://127.0.0.1:3000/guardarPaso", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: userDataJson,
    }).then((result) => {
        console.log("Termine paso 1.");
        //window.location.href = "portal.html";
    });
}

async function guardarPaso1Dir(n) {
    const mun = document.querySelector(".dir" + n + " .munidept #municipios").value;
    const dep = document.querySelector(".dir" + n + " .munidept #departamentos").value;

    const lista = await fetch("http://127.0.0.1:3000/getMaxDir");
    const dirIdDB = await lista.json();
    const dirMaxId = parseInt(dirIdDB[0].vmax);

    var id = 1;
    if (dirMaxId >= 1) { id = dirMaxId + n; }

    console.log("id definitiva = " + id);

    const userData = {
        id: id,
        dir: document.querySelector(".dir" + n + " .direccion .selector #TipoV").value + " " + document.querySelector(".dir" + n + " .direccion .input-contenedor #dirid").value,
        tipo: document.querySelector(".dir" + n + " .direccion .selector #TipoV").value,
        post: document.querySelector(".dir" + n + " .input-contenedor #cpd").value,
        mun: mun,
        dep: dep,
    }

    const userDataJson = JSON.stringify(userData);
    console.log(userData);

    fetch("http://127.0.0.1:3000/guardarInfoDir", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: userDataJson,
    }).then((result) => {
        console.log("Termine la direccion " + n)
    });
}

function guardarPaso1Tel(n) {
    const userData = {
        tel: document.querySelector(".tel" + n + " .telefono .input-contenedor #telid").value,
        tipo: document.querySelector(".tel" + n + " .telefono .selector #TipoT").value,
    }

    const userDataJson = JSON.stringify(userData);
    console.log("tel: " + userData.tel);

    if (userData.tel > 0 & (userData.tipo == "Fijo" | userData.tipo == "Móvil"))
        fetch("http://127.0.0.1:3000/guardarInfoTel", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: userDataJson,
        }).then((result) => {
            console.log("Termine el teléfono " + n)
        });
    else
        console.log("No se insertó un campo válido");
}

async function obtenerNombres() {

    const nombres = await fetch("http://127.0.0.1:3000/obtenerNombres");
    nombresJson = await nombres.json();

    nom1 = nombresJson[0].p_nombre;
    nom2 = nombresJson[0].s_nombre;
    ape1 = nombresJson[0].p_apellido;
    ape2 = nombresJson[0].d_apellido;

    console.log(nombresJson[0].d_apellido);

    document.getElementById('pnombre').innerHTML = '<label for="" id = "pnombre">' + nom1 + '</label>';
    document.getElementById('snombre').innerHTML = '<label for="" id = "snombre">' + nom2 + '</label>';
    document.getElementById('papellido').innerHTML = '<label for="" id = "papellido">' + ape1 + '</label>';
    document.getElementById('sapellido').innerHTML = '<label for="" id = "sapellido">' + ape2 + '</label>';
}

document.addEventListener("DOMContentLoaded", () => {
    obtenerNombres();
});
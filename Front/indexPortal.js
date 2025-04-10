function irAPagina(n) {
    window.location.href = 'paso' + n + '.html';
}

function adaptar(cad) {
    console.log(cad);
    if (cad == "Hecho") {
        return "v"
    } else {
        return "g"
    }
}

async function obtenerEstado() {
    inscripcion = await fetch("http://127.0.0.1:3000/obtenerInscripcion");
    inscripcionJson = await inscripcion.json();
    console.log(inscripcionJson.ins_id);

    if (inscripcionJson.ins_id == undefined) {
        estado1 = inscripcionJson[0].paso1
        estado2 = inscripcionJson[0].paso2
        estado3 = inscripcionJson[0].paso3
    } else {
        estado1 = estado2 = estado3 = 0;
    }

    document.getElementById('section').innerHTML = `
        <h1>PORTAL</h1>
        <button onclick="irAPagina(1)">¡Queremos Conocerte!</button>
        <button onclick="irAPagina(2)">¡Descubre tus Intereses!</button>
        <button onclick="irAPagina(3)">¡Finalización de Inscripción!</button>
        <i id="ck${adaptar(estado1)}1" class="fa-solid fa-circle-check"></i>
        <i id="ck${adaptar(estado2)}2" class="fa-solid fa-circle-check"></i>
        <i id="ck${adaptar(estado3)}3" class="fa-solid fa-circle-check"></i>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    obtenerEstado();
});
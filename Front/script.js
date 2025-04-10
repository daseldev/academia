function cargarMunicipios(selector) {
    const selectMunicipios = document.querySelector(selector);
    municipiosColombia.forEach((municipio) => {
        const option = document.createElement("option");
        option.value = municipio.toLowerCase();
        option.text = municipio;
        selectMunicipios.appendChild(option);
    });
}


function cargarDeptos(selector) {
    const selectDepartamentos = document.querySelector(selector);
    departamentosColombia.forEach((departamento) => {
        const option = document.createElement("option");
        option.value = departamento.toLowerCase();
        option.text = departamento;
        selectDepartamentos.appendChild(option);
    });
}

window.onload = function(){
    cargarMunicipios(".dir1 .munidept #municipios");
    cargarDeptos(".dir1 .munidept #departamentos");
    cargarMunicipios(".dir2 .munidept #municipios");
    cargarDeptos(".dir2 .munidept #departamentos");
    cargarMunicipios(".dir3 .munidept #municipios");
    cargarDeptos(".dir3 .munidept #departamentos");
}
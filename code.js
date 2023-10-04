const nombrePersonaInput = document.querySelector("#nombrePersona");
const resultadoMedianaPersonaDiv = document.querySelector("#resultMedPersona");
const resultProyPersonaDiv = document.querySelector("#resultProyPersona");
const nombreEmpresaInput = document.querySelector("#nombreEmpresa");
const yearEmpresaInput = document.querySelector("#yearEmpresa");
const resultMedEmpresaYearDiv = document.querySelector("#resultMedEmpresaYear");
const resultProyEmpresaDiv = document.querySelector("#resultProyEmpresa");
const resultMedGeneralDiv = document.querySelector("#resultMedGeneral");
const resultMedTop10Div = document.querySelector("#resultMedTop10");

const selectNombre = document.createElement("select");
const selectEmpresa = document.createElement("select");
const selectYear = document.createElement("select");

const nombresUnicos = [...new Set(salarios.map((salario) => salario.name))];
nombresUnicos.forEach((nombre) => {
  const option = document.createElement("option");
  option.value = nombre;
  option.text = nombre;
  selectNombre.appendChild(option);
});
nombrePersonaInput.replaceWith(selectNombre);

const empresasUnicas = [
  ...new Set(
    salarios.flatMap((salario) =>
      salario.trabajos.map((trabajo) => trabajo.empresa)
    )
  ),
];
empresasUnicas.forEach((empresa) => {
  const option = document.createElement("option");
  option.value = empresa;
  option.text = empresa;
  selectEmpresa.appendChild(option);
});
nombreEmpresaInput.replaceWith(selectEmpresa);

const yearsUnicos = [
  ...new Set(
    salarios.flatMap((salario) =>
      salario.trabajos.map((trabajo) => trabajo.year)
    )
  ),
];
yearsUnicos.forEach((year) => {
  const option = document.createElement("option");
  option.value = year;
  option.text = year;
  selectYear.appendChild(option);
});
yearEmpresaInput.replaceWith(selectYear);

selectEmpresa.addEventListener("change", filtrarNombresPorEmpresa);
selectYear.addEventListener("change", filtrarNombresPorEmpresa);

function filtrarNombresPorEmpresa() {
  const nombreEmpresaSeleccionada = selectEmpresa.value;
  const yearSeleccionada = selectYear.value;

  const nombresFiltrados = salarios
    .filter((salario) =>
      salario.trabajos.some(
        (trabajo) =>
          trabajo.empresa === nombreEmpresaSeleccionada &&
          trabajo.year.toString() === yearSeleccionada
      )
    )
    .map((salario) => salario.name);

  selectNombre.innerHTML = "";
  nombresFiltrados.forEach((nombre) => {
    const option = document.createElement("option");
    option.value = nombre;
    option.text = nombre;
    selectNombre.appendChild(option);
  });
}

document
  .querySelector(".containerMedianaPersona button")
  .addEventListener("click", calcularMedianaPersona);
document
  .querySelector(".containerProyeccionPersona button")
  .addEventListener("click", calcularProyeccionPorPersona);
document
  .querySelector(".containerMedianaEmpresaYear button")
  .addEventListener("click", calcularMedianaEmpresaYear);
document
  .querySelector(".containerProyeccionEmpresa button")
  .addEventListener("click", calcularProyeccionPorEmpresa);
document
  .querySelector(".containerMedianaGeneral button")
  .addEventListener("click", calcularMedianaGeneral);
document
  .querySelector(".containerCalcularMedianaTop10 button")
  .addEventListener("click", calcularMedianaTop10);

function calcularMedianaPersona() {
  const nombrePersona = selectNombre.value;
  const resultadoMedianaPersona = medianaPorPersona(nombrePersona);
  resultadoMedianaPersonaDiv.innerText = `La mediana de salarios para ${nombrePersona} es: ${resultadoMedianaPersona}`;
}

function calcularProyeccionPorPersona() {
  const nombrePersona = selectNombre.value;
  const resultProyPersona = Math.round(proyeccionPorPersona(nombrePersona));
  resultProyPersonaDiv.innerText = `La proyección de salario para ${nombrePersona} es: ${resultProyPersona}`;
}

function calcularMedianaEmpresaYear() {
  const nombreEmpresa = selectEmpresa.value;
  const yearEmpresa = selectYear.value;
  const resultMedEmpresaYear = medianaEmpresaYear(nombreEmpresa, yearEmpresa);

  if (resultMedEmpresaYear === undefined) {
    resultMedEmpresaYearDiv.innerText = `La empresa ${nombreEmpresa} no existió en el año ${yearEmpresa}.`;
  } else {
    resultMedEmpresaYearDiv.innerText = `La mediana de salarios para la empresa ${nombreEmpresa} en el año ${yearEmpresa} es: ${resultMedEmpresaYear}`;
  }
}

function calcularProyeccionPorEmpresa() {
  const nombreEmpresa = selectEmpresa.value;

  const resultMedEmpresaYear = medianaEmpresaYear(nombreEmpresa, selectYear.value);
  if (resultMedEmpresaYear=== undefined) {
    resultProyEmpresaDiv.innerText = `La empresa ${nombreEmpresa} no existió en ese año.`;
    return;
  }
  const resultProyEmpresa = Math.round(proyeccionPorEmpresa(nombreEmpresa));
  resultProyEmpresaDiv.innerText = `La proyección de salario para ${nombreEmpresa} es: ${resultProyEmpresa}`;
}

function calcularMedianaGeneral() {
  const resultMedGeneral = medianaGeneral();
  resultMedGeneralDiv.innerText = `La mediana general de salarios es: ${resultMedGeneral}`;
}

function calcularMedianaTop10() {
  const resultMedTop10 = medianaTop10();
  resultMedTop10Div.innerText = `La mediana del top 10% de salarios es: ${resultMedTop10}`;
}
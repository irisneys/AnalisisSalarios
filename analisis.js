
function encontarPersona (personaEnBusqueda){
    return salarios.find(persona => persona.name == personaEnBusqueda);
}

function medianaPorPersona(nombrePersona){
    const trabajos = encontarPersona(nombrePersona).trabajos;

    const salarios = trabajos.map(function (elemento){
        return elemento.salario;
        
    });
        const medianaSalario = MathObjet.calacularMediana(salarios);
       // console.log(medianaSalario);
        return medianaSalario;
}

function proyeccionPorPersona(nombrePersona){
  const trabajos = encontarPersona(nombrePersona).trabajos;

  let porcentajesCrecimiento = [];

  for (let i = 1; i < trabajos.length; i++) {
    const actualSalario = trabajos[i].salario;
    const salarioAnterior = trabajos[i - 1].salario;
    const crecimiento = actualSalario - salarioAnterior;
    const porcentajeCrecimiento = crecimiento / salarioAnterior;
    porcentajesCrecimiento.push(porcentajeCrecimiento);
  }
  const medianaPorecentajesCrecimiento = MathObjet.calacularMediana(porcentajesCrecimiento);

  console.log({ porcentajesCrecimiento, medianaPorecentajesCrecimiento });

  const ultimoSalario = trabajos[trabajos.length - 1].salario;
  const aumento = ultimoSalario * medianaPorecentajesCrecimiento;
  const nuevoSalario = ultimoSalario + aumento;

  return nuevoSalario;
}

const empresas = {
};

for (persona of salarios) {
  for (trabajo of persona.trabajos) {
    if (!empresas [trabajo.empresa]) {
      empresas[trabajo.empresa] = {};
    }
    if (!empresas[trabajo.empresa][trabajo.year]) {
      empresas[trabajo.empresa][trabajo.year] = [];
      
    }
    empresas[trabajo.empresa][trabajo.year].push(trabajo.salario);
  }
}

console.log(empresas)

// Función para calcular la mediana de los salarios de una empresa en un año específico
function medianaEmpresaYear(empresa, year) {
  if (!empresas[empresa]) {
    console.warn("la empresa no existe");    
  }else if (!empresas[empresa][year]){
    console.warn("no hay salario de esa empresa");
  }else{
    return MathObjet.calacularMediana(empresas[empresa][year]);
  }
}

/////////////////////////////////////// proyeccion por empresas///////////////////////////////////////////////////////////////////

function proyeccionPorEmpresa(empresa) {
  if (!empresas[empresa]) {
    console.warn('La empresa no existe');   
  } else {
    //arreglo a partir otro con map
    const empresaYears = Object.keys(empresas[empresa]);
    const listaMedianaYears = empresaYears.map((year) => {
      return medianaEmpresaYear(empresa, year);
    })
  
  let porcentajesCrecimiento = []

    for (let i = 1; i < listaMedianaYears.length; i++) {
      const actualSalario = listaMedianaYears[i];
      const salarioAnterior = listaMedianaYears[i - 1];
      const crecimiento = actualSalario - salarioAnterior;
      const porcentajeCrecimiento = crecimiento / salarioAnterior;
      porcentajesCrecimiento.push(porcentajeCrecimiento);
    }
    const medianaPorecentajesCrecimiento = MathObjet.calacularMediana(porcentajesCrecimiento);
 
      console.log({ porcentajesCrecimiento, medianaPorecentajesCrecimiento });

      const ultimaMedianaSalario = listaMedianaYears[listaMedianaYears.length - 1];
      const aumento = ultimaMedianaSalario * medianaPorecentajesCrecimiento;
      const nuevoMedianaSalario = ultimaMedianaSalario + aumento;

      return nuevoMedianaSalario;
}
}

//console.log(proyeccionPorEmpresa('Industrias Mokepon'));

//###########################Analisis general################################

function medianaGeneral (){
  
  const listaMedianaPorNombre = salarios.map((persona) => medianaPorPersona(persona.name));
  const medianaGen = MathObjet.calacularMediana(listaMedianaPorNombre)
 
  return medianaGen

  }

  function medianaTop10() {
    const listaMedianaPorNombre = salarios.map((persona) =>
      medianaPorPersona(persona.name)
    );
    const medianaOrdenada = MathObjet.ordenarLista(listaMedianaPorNombre);
    const cantidad = listaMedianaPorNombre.length / 10;
    const limite = listaMedianaPorNombre.length - cantidad;
    const top10 = medianaOrdenada.slice(limite, medianaOrdenada.length);
    // console.log({ cantidad, limite, top10 });
    const medianaTop10 = MathObjet.calacularMediana(top10);
    return medianaTop10;
  }


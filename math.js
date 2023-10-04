
const MathObjet = {

};

  MathObjet.esPar =  function esPar(lista) {
    return !(lista.length % 2);
    }
    MathObjet.esImpar =  function esImpar(lista) {
    return lista.length % 2;
    }

 //############################  Moda  #################################################################

    //const lista = [  35, 2, 2, 1, 4, 5, 6, 5, 2, 2, 23, 1, 8, 5, 2, 7, 98, 5, 4, 7, 1, 3, 2, 5, 4, 6, 9, 8, 7, 9, 8, 5, 2,  ];

    MathObjet.calcularModa =  function calcularModa(lista) {
    const listaCount = {};

    for (let i = 0; i < lista.length; i++) {
        const elemento = lista[i];
        if (listaCount[elemento]) {
        listaCount[elemento] += 1;
        } else {
        listaCount[elemento] = 1;
        }
    }

    const listaArray = Object.entries(listaCount);
    const listaBidimeOrdenana = ordenarListaBidimensional(listaArray, 1);
    const listaBidiOrdeaMaxNumber =
        listaBidimeOrdenana[listaBidimeOrdenana.length - 1];
    const moda = listaBidiOrdeaMaxNumber[0];
    return moda;
    }

   

    //############################  Mediana  #################################################################

    MathObjet.calacularMediana = function calacularMediana(listaDesordenada) {
    const lista = MathObjet.ordenarLista(listaDesordenada);
    const listaEsPar = MathObjet.esPar(lista);
    if (listaEsPar) {
        const indexMitadListaImpar1 = lista.length / 2 - 1;
        const indexMitadListaImpar2 = lista.length / 2;
        const listaMitades = [];
        listaMitades.push(lista[indexMitadListaImpar1]);
        listaMitades.push(lista[indexMitadListaImpar2]);

        const medianaPar = MathObjet.calcularPromedio(listaMitades);
        return medianaPar;
    } else {
        const indexMitadListaImpar = Math.floor(lista.length / 2);
        const medianaImpar = lista[indexMitadListaImpar];
        //console.log(medianaImpar);
        return medianaImpar;
    }
    }

     //############################  Media Aritmetica (Promedio)  #################################################################

    MathObjet.calcularPromedio = function calcularPromedio(lista) {
    function sumaTodoeElementos(valorAcumulado, nuevoValor) {
        return valorAcumulado + nuevoValor;
    }
    const sumLista = lista.reduce(sumaTodoeElementos);

    const promedio = sumLista / lista.length;
    //console.log(promedio);
    return promedio;
    }

   // const listaDesordenada = [ 45, 102, 36, 58, 95, 84, 71, 2, 14855, 9, 63, 48, 2, 47,  ];

    MathObjet.ordenarLista = function ordenarLista(listaDesordenada) {
    function ordenarListaSort(valorAcumulado, nuevoValor) {
        return valorAcumulado - nuevoValor;
    }

    const lista = listaDesordenada.sort(ordenarListaSort);

    //console.log(lista);
    return lista;
    }

    MathObjet.ordenarListaBidimensional = function ordenarListaBidimensional(listaDesordenada, i) {
    function ordenarListaSort(valorAcumulado, nuevoValor) {
        return valorAcumulado[i] - nuevoValor[i];
    }

    const lista = listaDesordenada.sort(ordenarListaSort);
    //console.log(lista);
    return lista;
    }



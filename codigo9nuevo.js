
//Inicio de mi codigo en 4x4 como ejemplo
/*
function imprimeDADO(array) {
	document.write("<br>");
	document.write(array[0]," - ", array[1]," - ", array[2]," - ", array[3]);
    document.write("<br>");
	document.write(array[4]," - ", array[5]," - ", array[6]," - ", array[7]);
	document.write("<br>");
	document.write(array[8]," - ", array[9]," - ", array[10]," - ", array[11]);
	document.write("<br>");
	document.write(array[12]," - ", array[13]," - ", array[14]," - ", array[15]);
  	
}
*/
//Muestra esto en HTML
document.write("<H1>Resultados de Sudoku</H1>");

//Funciom para mostrar el sodoku inicial y final
function imprimeDADO(array) {
  
  let output = "<table>"; // Inicio de la tabla
  for (let i = 0; i < 81; i += 9) {
    output += "<tr><td>" + array.slice(i, i + 9).join("</td><td>") + "</td></tr>";
  }
  output += "</table>"; // Fin de la tabla
  document.write(output);
}

//Funcion para crear los cromosomas de la poblacion
function obtenerCromosoma(array) {
  let nuevoArray = [];
  for (let i = 0; i < array.length; i++) { //Recorre el sudoku en busca de los 0s
    if (array[i] === 0) {
      nuevoArray.push(Math.floor(Math.random() * 9) + 1); //Al encontrarlo lo reemplaza por numeros ente 1-9
    } else {
      nuevoArray.push(array[i]); //Los numeros del problema se copian nuevamenete
  	}
	}
  return nuevoArray;

}

// Funcion para obtener los espacios de cada gen del cromosomas
function obtenerEv(array) { 
  let nuevoArray = [];
  for (let i = 0; i < array.length; i++) { //Recorre todo el array
    if (array[i] === 0) {
      nuevoArray.push(i); 	//Guarda la posicion de los 0s en un nuevo array
    } 
  }
  return nuevoArray;  			//Retorna el nuevo array con las posiciones de los genes
}


//Valores Iniciales del Programa escogidos por el usuario
let sudoku = vSudoku;
let selecM = vSelect;
let selecCross = vCruzz;
let genMax = vGene;   //Maximo hasta ahora 250000
let aptituMinima = vApti;
let mutacion = vMuta;

//Contadores y valores iniciales para la solucion
let contMutacionn = 0;
let arrayA = [];
let arrayEv = [];

let solucion = [];
let fitSolucion = 0;
let nSolucion = 0;

//Sudokus cargados en el Sistema
switch (sudoku) {
  case 1://Sudoku Facil 1
    arrayA = [ 8, 4, 9,  0, 1, 2,  0, 0, 3,
		   		 		 7, 2, 5,  4, 0, 0,  6, 0, 9,
		   		 		 3, 6, 1,  9, 0, 5,  4, 0, 8,

		   		 		 2, 9, 0,  0, 0, 0,  8, 0, 6,
		   		 		 5, 0, 4,  0, 0, 0,  2, 0, 0,
		   		 		 1, 0, 6,  0, 0, 0,  0, 3, 5,

		   		 		 9, 0, 2,  8, 0, 3,  1, 6, 7,
		   		 		 6, 0, 7,  0, 0, 9,  0, 0, 0,
		   		 		 4, 0, 0,  1, 6, 0,  0, 9, 2];
    arrayEv = obtenerEv(arrayA);
    break;
  case 2://Sudoku Facil 2
    arrayA = [6, 5, 3,  1, 8, 7,  4, 0, 0,
		   		 	  8, 9, 2,  6, 4, 3,  1, 7, 5,
		   		 		4, 7, 1,  9, 2, 5,  8, 3, 6,

		   		 		3, 0, 8,  0, 0, 9,  0, 0, 1,
		   		 		1, 0, 7,  0, 3, 2,  0, 0, 8,
		   		 		5, 0, 9,  8, 0, 1,  3, 4, 0,

		   		 		0, 3, 5,  0, 1, 4,  6, 8, 0,
		   		 		7, 1, 6,  3, 9, 8,  2, 5, 4,
		   		 		0, 8, 4,  0, 5, 6,  0, 1, 3];
    arrayEv = obtenerEv(arrayA);
    break;

   case 3://Sudoku Facil 3
    arrayA = [ 0, 7, 0,  5, 8, 3,  0, 2, 0,
		   		 		 0, 5, 9,  2, 0, 0,  3, 0, 0,
		   		 		 3, 4, 0,  0, 0, 0,  5, 0, 7,

		   		 		 7, 9, 5,  0, 0, 0,  6, 3, 2,
		   		 		 0, 0, 3,  6, 9, 7,  1, 0, 0,
		   		 		 6, 8, 0,  0, 0, 2,  7, 0, 0,

		   		 		 9, 1, 4,  8, 3, 5,  0, 7, 6,
		   		 		 0, 3, 0,  7, 0, 1,  4, 9, 5,
		   		 		 5, 6, 7,  4, 2, 9,  0, 1, 3];
    arrayEv = obtenerEv(arrayA);
    break;

    case 4://Sudoku Facil 4
    arrayA = [ 8, 4, 9,  0, 1, 2,  0, 0, 3,
		   		 		 7, 2, 0,  4, 3, 8,  6, 0, 9,
		   		 		 3, 6, 1,  9, 0, 5,  4, 0, 8,

		   		 		 2, 9, 0,  0, 0, 0,  8, 0, 6,
		   		 		 0, 0, 4,  0, 0, 0,  2, 0, 0,
		   		 		 1, 0, 6,  0, 0, 0,  0, 3, 5,

		   		 		 9, 0, 2,  8, 0, 3,  1, 6, 7,
		   		 		 6, 0, 7,  0, 0, 9,  0, 0, 0,
		   		 		 4, 0, 0,  1, 6, 0,  0, 9, 2];
    arrayEv = obtenerEv(arrayA);
    break;

    case 5://Sudoku Facil 5
    arrayA = [ 0, 3, 0,  2, 0, 0,  0, 7, 0,
		   		 		 9, 0, 0,  4, 1, 3,  0, 0, 8,
		   		 		 0, 0, 1,  0, 7, 0,  3, 0, 0,

		   		 		 7, 1, 0,  0, 4, 0,  0, 9, 5,
		   		 		 0, 8, 6,  9, 0, 7,  4, 3, 0,
		   		 		 5, 9, 0,  0, 2, 0,  0, 8, 7,

		   		 		 0, 0, 8,  0, 6, 0,  9, 0, 0,
		   		 		 6, 0, 0,  1, 3, 2,  0, 0, 4,
		   		 		 0, 4, 0,  8, 0, 5,  0, 6, 0];
    arrayEv = obtenerEv(arrayA);
    break;

    case 6://Sudoku Facil 6
    arrayA = [ 9, 6, 1,  0, 4, 3,  0, 0, 2,
		   		 		 7, 0, 3,  0, 8, 5,  9, 4, 1,
		   		 		 0, 4, 5,  9, 2, 1,  0, 0, 0,

		   		 		 3, 9, 0,  1, 0, 0,  0, 0, 5,
		   		 		 1, 0, 4,  0, 9, 2,  3, 6, 8,
		   		 		 5, 0, 2,  4, 3, 0,  0, 0, 7,

		   		 		 4, 3, 7,  8, 0, 9,  2, 0, 0,
		   		 		 0, 1, 0,  2, 5, 0,  8, 3, 0,
		   		 		 0, 5, 8,  3, 0, 4,  7, 0, 0];
    arrayEv = obtenerEv(arrayA);
    break;

    case 7://Sudoku Facil 7
    arrayA = [ 5, 2, 0,  0, 3, 9,  0, 0, 0,
		   		 		 4, 6, 8,  7, 0, 5,  2, 9, 3,
		   		 		 3, 1, 0,  2, 0, 0,  7, 0, 0,

		   		 		 0, 3, 0,  0, 5, 0,  0, 0, 0,
		   		 		 0, 0, 0,  1, 0, 0,  0, 2, 0,
		   		 		 0, 9, 2,  0, 8, 0,  0, 6, 0,

		   		 		 0, 8, 0,  0, 0, 0,  1, 3, 0,
		   		 		 0, 5, 0,  0, 2, 0,  0, 8, 0,
		   		 		 0, 7, 1,  0, 0, 0,  9, 0, 6];
    arrayEv = obtenerEv(arrayA);
    break;

    case 8://Sudoku Facil 8
    arrayA = [ 3, 0, 9,  0, 0, 0,  0, 0, 8,
		   		 		 0, 8, 0,  0, 9, 6,  0, 7, 0,
		   		 		 0, 0, 5,  4, 0, 8,  9, 0, 2,

		   		 		 0, 3, 2,  0, 6, 0,  5, 0, 0,
		   		 		 0, 5, 0,  9, 0, 2,  0, 8, 0,
		   		 		 0, 0, 7,  0, 5, 0,  2, 6, 0,

		   		 		 9, 0, 3,  1, 0, 5,  7, 0, 0,
		   		 		 0, 2, 0,  6, 7, 0,  0, 9, 0,
		   		 		 7, 0, 0,  0, 0, 0,  3, 0, 6];
    arrayEv = obtenerEv(arrayA);
    break;

    case 9://Sudoku Facil 9
    arrayA = [ 1, 8, 6,  0, 0, 0,  0, 0, 5,
		   		 		 0, 0, 5,  0, 0, 0,  1, 0, 4,
		   		 		 0, 9, 0,  0, 0, 1,  0, 0, 0,

		   		 		 0, 5, 0,  1, 0, 0,  0, 8, 0,
		   		 		 0, 0, 1,  4, 0, 0,  7, 0, 0,
		   		 		 8, 0, 0,  5, 9, 7,  6, 1, 0,

		   		 		 2, 1, 0,  0, 4, 0,  0, 0, 6,
		   		 		 6, 0, 0,  9, 0, 0,  0, 4, 0,
		   		 		 5, 0, 0,  7, 1, 0,  0, 3, 8];
    arrayEv = obtenerEv(arrayA);
    break;

    case 10://Sudoku Facil 10
    arrayA = [ 3, 0, 0,  2, 0, 7,  1, 0, 0,
		   		 		 0, 6, 2,  0, 0, 0,  3, 0, 0,
		   		 		 8, 0, 0,  0, 0, 0,  0, 0, 4,

		   		 		 5, 3, 4,  8, 0, 1,  0, 7, 6,
		   		 		 7, 0, 1,  6, 0, 5,  4, 0, 8,
		   		 		 2, 0, 0,  7, 0, 3,  5, 1, 9,

		   		 		 9, 0, 0,  0, 0, 0,  0, 0, 2,
		   		 		 0, 0, 8,  0, 0, 0,  7, 9, 0,
		   		 		 0, 0, 7,  4, 0, 9,  0, 0, 3];
    arrayEv = obtenerEv(arrayA);
    break;


   case 11://Sudoku Medio 1
    arrayA = [3, 0, 0,  0, 0, 0,  0, 0, 2,
		   		 	  0, 0, 4,  1, 0, 5,  7, 0, 0,
		   		 		0, 7, 6,  0, 0, 0,  1, 4, 0,

		   		 		0, 3, 0,  5, 0, 1,  0, 6, 0,
		   		 		0, 0, 0,  0, 8, 0,  0, 0, 0,
		   		 		0, 8, 0,  9, 0, 6,  0, 7, 0,

		   		 		0, 4, 8,  0, 0, 0,  3, 9, 0,
		   		 		0, 0, 9,  4, 0, 3,  5, 0, 0,
		   		 		2, 0, 0,  0, 0, 0,  0, 0, 4];
    arrayEv = obtenerEv(arrayA);
    break;

  case 12://Sudoku Medio 2
    arrayA = [0, 0, 0,  0, 0, 0,  4, 5, 0,
		   		 	  0, 9, 5,  0, 0, 0,  0, 0, 0,
		   		 		0, 0, 0,  0, 0, 3,  0, 9, 0,

		   		 		0, 0, 0,  0, 8, 1,  0, 7, 0,
		   		 		5, 0, 8,  0, 0, 2,  0, 0, 0,
		   		 		0, 1, 0,  0, 9, 7,  0, 3, 0,

		   		 		7, 6, 0,  0, 0, 0,  0, 0, 4,
		   		 		0, 3, 0,  1, 0, 0,  0, 0, 0,
		   		 		0, 0, 0,  2, 0, 0,  0, 0, 6];
    arrayEv = obtenerEv(arrayA);
    break;

    case 13://Sudoku Medio 3
    arrayA = [ 0, 8, 1,  0, 0, 0,  0, 0, 0,
		   		 		 0, 0, 0,  4, 0, 0,  8, 2, 0,
		   		 		 7, 0, 0,  0, 0, 0,  0, 0, 6,

		   		 		 9, 2, 0,  0, 0, 7,  0, 0, 0,
		   		 		 1, 0, 8,  5, 0, 0,  9, 0, 0,
		   		 		 4, 0, 5,  0, 0, 0,  2, 8, 0,

		   		 		 0, 0, 3,  0, 0, 2,  6, 0, 0,
		   		 		 0, 0, 0,  3, 0, 9,  0, 0, 0,
		   		 		 2, 0, 0,  8, 0, 0,  0, 9, 5];
    arrayEv = obtenerEv(arrayA);
    break;

    case 14://Sudoku Medio 4
    arrayA = [ 0, 0, 0,  0, 0, 1,  0, 0, 0,
		   		 		 0, 0, 6,  9, 8, 0,  0, 0, 7,
		   		 		 8, 0, 5,  0, 0, 0,  6, 3, 9,

		   		 		 0, 0, 9,  0, 0, 7,  0, 2, 0,
		   		 		 0, 7, 0,  0, 0, 6,  0, 0, 0,
		   		 		 0, 0, 0,  0, 0, 0,  9, 0, 0,

		   		 		 0, 6, 2,  7, 4, 9,  0, 0, 3,
		   		 		 3, 5, 0,  6, 0, 0,  0, 0, 2,
		   		 		 0, 0, 0,  0, 5, 0,  7, 0, 0];
    arrayEv = obtenerEv(arrayA);
    break;

    case 15://Sudoku Medio 5
    arrayA = [ 8, 0, 0,  0, 4, 9,  6, 2, 0,
		   		 		 1, 0, 0,  0, 0, 0,  0, 0, 0,
		   		 		 0, 3, 2,  0, 0, 0,  0, 8, 7,

		   		 		 0, 0, 0,  0, 0, 0,  0, 0, 0,
		   		 		 9, 4, 0,  1, 5, 0,  0, 0, 0,
		   		 		 0, 0, 0,  0, 0, 6,  0, 3, 0,

		   		 		 0, 0, 9,  8, 0, 0,  0, 0, 0,
		   		 		 0, 0, 0,  0, 6, 0,  2, 0, 0,
		   		 		 0, 0, 8,  0, 2, 3,  5, 0, 0];
    arrayEv = obtenerEv(arrayA);
    break;

    case 16://Sudoku Medio 6
    arrayA = [ 0, 4, 0,  0, 0, 0,  0, 0, 0,
		   		 		 5, 3, 0,  0, 4, 0,  0, 7, 2,
		   		 		 7, 0, 0,  6, 2, 0,  0, 8, 0,

		   		 		 4, 5, 0,  0, 8, 0,  0, 0, 6,
		   		 		 0, 2, 0,  0, 6, 0,  0, 0, 0,
		   		 		 9, 6, 0,  0, 0, 4,  8, 0, 0,

		   		 		 6, 7, 0,  0, 9, 0,  0, 3, 0,
		   		 		 0, 0, 5,  8, 0, 7,  0, 4, 0,
		   		 		 0, 0, 0,  4, 0, 0,  5, 0, 7];
    arrayEv = obtenerEv(arrayA);
    break;

    case 17://Sudoku Medio 7
    arrayA = [ 0, 0, 0,  0, 9, 1,  4, 0, 0,
		   		 		 8, 0, 0,  0, 0, 2,  3, 0, 0,
		   		 		 0, 0, 3,  0, 0, 0,  0, 1, 7,

		   		 		 0, 0, 4,  0, 0, 0,  0, 6, 2,
		   		 		 9, 0, 0,  4, 0, 0,  0, 0, 5,
		   		 		 1, 8, 0,  0, 2, 0,  0, 0, 0,

		   		 		 0, 4, 0,  0, 0, 5,  2, 0, 0,
		   		 		 5, 0, 9,  2, 0, 0,  0, 0, 0,
		   		 		 0, 3, 0,  1, 8, 0,  0, 4, 0];
    arrayEv = obtenerEv(arrayA);
    break;

    case 18://Sudoku Medio 18
    arrayA = [ 0, 9, 4,  0, 0, 0,  3, 6, 5,
		   		 		 3, 0, 7,  5, 0, 6,  0, 0, 1,
		   		 		 1, 0, 0,  2, 4, 3,  0, 0, 7,

		   		 		 0, 0, 8,  0, 0, 4,  0, 0, 3,
		   		 		 9, 3, 5,  8, 0, 7,  0, 4, 2,
		   		 		 0, 0, 0,  3, 0, 0,  0, 0, 9,

		   		 		 0, 0, 0,  0, 0, 0,  0, 0, 8,
		   		 		 0, 1, 9,  6, 7, 0,  0, 3, 0,
		   		 		 0, 4, 0,  0, 2, 0,  0, 0, 6];
    arrayEv = obtenerEv(arrayA);
    break;

    case 19://Sudoku Medio 19
    arrayA = [ 0, 0, 5,  0, 0, 0,  0, 3, 0,
		   		 		 0, 0, 0,  4, 0, 0,  9, 0, 8,
		   		 		 2, 8, 0,  0, 0, 0,  0, 1, 0,

		   		 		 0, 0, 6,  0, 0, 0,  0, 0, 0,
		   		 		 5, 2, 4,  9, 0, 0,  0, 0, 0,
		   		 		 0, 0, 0,  0, 3, 0,  0, 4, 0,

		   		 		 0, 5, 0,  0, 6, 3,  0, 0, 7,
		   		 		 0, 6, 7,  0, 2, 0,  4, 0, 0,
		   		 		 1, 0, 0,  0, 4, 0,  5, 0, 0];
    arrayEv = obtenerEv(arrayA);
    break;

    case 20://Sudoku Medio 20
    arrayA = [ 6, 0, 0,  0, 3, 7,  0, 0, 0,
		   		 		 0, 9, 2,  0, 0, 0,  0, 0, 0,
		   		 		 0, 0, 4,  0, 0, 0,  3, 5, 0,

		   		 		 0, 0, 0,  0, 0, 0,  8, 0, 0,
		   		 		 2, 0, 0,  0, 0, 0,  9, 0, 0,
		   		 		 4, 1, 0,  0, 5, 9,  0, 7, 0,

		   		 		 0, 2, 1,  4, 0, 0,  0, 0, 0,
		   		 		 0, 0, 0,  0, 1, 0,  5, 0, 0,
		   		 		 0, 0, 5,  0, 6, 0,  2, 0, 0];
    arrayEv = obtenerEv(arrayA);
    break;

  //Mensaje en caso no se seleccione un sodoku correctamente
  default:
    document.write("No se encontro ningun SUDOKU");
}

//Imprime el sudoku Inicial a resolver
imprimeDADO(arrayA);



//Poblacion de Cromosomas 
cromo1 = obtenerCromosoma(arrayA);
cromo2 = obtenerCromosoma(arrayA);
cromo3 = obtenerCromosoma(arrayA);
cromo4 = obtenerCromosoma(arrayA);
cromo5 = obtenerCromosoma(arrayA);
cromo6 = obtenerCromosoma(arrayA);
cromo7 = obtenerCromosoma(arrayA);
cromo8 = obtenerCromosoma(arrayA);
cromo9 = obtenerCromosoma(arrayA);
cromo10 = obtenerCromosoma(arrayA);

//Almacenamiendo del resultado fitness de cada cromosoma
fitCromo1 = fitnessC(cromo1);
fitCromo2 = fitnessC(cromo2);
fitCromo3 = fitnessC(cromo3);
fitCromo4 = fitnessC(cromo4);
fitCromo5 = fitnessC(cromo5);
fitCromo6 = fitnessC(cromo6);
fitCromo7 = fitnessC(cromo7);
fitCromo8 = fitnessC(cromo8);
fitCromo9 = fitnessC(cromo9);
fitCromo10 = fitnessC(cromo10);

//Estafuncion se encarga de rellenar el sudoku inicial con el Cromosoma
//Esta funcion se usa mucho para devolver el cromosoa mas optimo en los Cruzamientos 
function rellenandoSudoku(array1, array2) {
  let i = 0;
  let nArrayA = array1.slice(); // Se hace una copia de array1
  let nArrayC = array2.slice();	// Se hace una copia de array2
  nArrayA.forEach((num, index) => { //Busca elementos con 0 para reemplazarlos por el cromosoma
    if (num === 0) {
      if (i < nArrayC.length) {
        nArrayA[index] = nArrayC[i];
        i++;
      } else {
        return nArrayA; // si ya no quedan elementos en nArrayC, retornar nArrayA
      }
    }
  });

  return nArrayA; // retornar nArrayA modificado
}

function cruze1(arrayY, arrayZ) { //Cruzamiento de 1 Punto...............................................
	
	//Variales para la evaluacion del cromosoma y los los hijos
	let recorrer = arrayEv;
	let cromoEx1 = [];
	let cromoEx2 = [];
	let exp;

	//Copia los valores de las posiciones en nuevos array para los hijos
	for (var i = 0; i <= recorrer.length - 1; i++) {
		exp = recorrer[i];
    cromoEx1.push(arrayY[exp]);
    cromoEx2.push(arrayZ[exp]);
  }

  //Divide ambos array por la mitad
  const mitadCromo1 = cromoEx1.slice(0, Math.ceil(cromoEx1.length / 2));
	const mitadCromo2 = cromoEx2.slice(Math.ceil(cromoEx2.length / 2));

	//Divide la segunda mitad par el segundo hijo
	const mitadCromo2_2 = cromoEx2.slice(0, Math.ceil(cromoEx2.length / 2));
	const mitadCromo1_1 = cromoEx1.slice(Math.ceil(cromoEx1.length / 2));

	// Se crean los hijos usando las mitades de los cromosomas
	let newCromoH1 = [...mitadCromo1, ...mitadCromo2];
	let newCromoH2 = [...mitadCromo2_2, ...mitadCromo1_1];

	//Mutacion se hace ambos hijos del cruce antes de escoger el mas apto
  if(mutacion == contMutacionn && mutacion != 0)
  {
	  //Escoge la posicion al azar en los genes
		const indiceAleatorio = Math.floor(Math.random() * newCromoH1.length);
		//Escoge un numero aleatorio entre 1 y 9
	  let numeroAleatorio = Math.floor(Math.random() * 9) + 1;

	  //Se asegura que el numero al azar no sea al mismo que pretende cambiar
	  while (numeroAleatorio === newCromoH1[indiceAleatorio]) {
	    numeroAleatorio = Math.floor(Math.random() * 9) + 1;
	  }

	  //Se inserta el numero aleatorio en la posicion aleatoria
	  newCromoH1[indiceAleatorio] = numeroAleatorio;

	  //Escoge la posicion al azar en los genes
		const indiceAleatorio2 = Math.floor(Math.random() * newCromoH2.length);

		//Escoge un numero aleatorio entre 1 y 9
	  let numeroAleatorio2 = Math.floor(Math.random() * 9) + 1;

	  //Se asegura que el numero al azar no sea al mismo que pretende cambiar
	  while (numeroAleatorio2 === newCromoH2[indiceAleatorio2]) {
	    numeroAleatorio2 = Math.floor(Math.random() * 9) + 1;
	  }

	  //Se inserta el numero aleatorio en la posicion aleatoria
	  newCromoH2[indiceAleatorio2] = numeroAleatorio2;

	}

	//Se rellenan los sudokus con los cromosomas Hijos
  newCromoH1 = rellenandoSudoku(arrayA, newCromoH1);
  newCromoH2 = rellenandoSudoku(arrayA, newCromoH2);
 
  //Se asigna el peso Fitness a cada cromosoma
  let pesoC1 = fitnessC(newCromoH1);
 	let pesoC2 = fitnessC(newCromoH2);

 	//Variable hijo, esta sera la que entregue la funcion
 	let nHijo = [];

 	//Se escoge el cromosoma de menor peso fitness, es decir, el que tenga menos errores
	if (pesoC2 < pesoC1){
		nHijo = [{cromo: newCromoH2, fit: pesoC2}];
	}else{
		nHijo = [{cromo: newCromoH1, fit: pesoC1}];
	}

	//Retorna el hijo mas optimo
 	return nHijo;
}

function cruze2(arrayY, arrayZ) { //Cruzamiento Uniforme 0s y 1s.............................................
	
	//Variales para la evaluacion del cromosoma y los los hijos
	let recorrer = arrayEv;  //Obtiene las podiciones de los genes a modificar del cromosoma
	let cromoEx1 = [];
	let cromoEx2 = [];
	let exp;

	//Copia los valores de las posiciones en nuevos array para los hijos
	for (var i = 0; i <= recorrer.length - 1; i++) {
		exp = recorrer[i];
    cromoEx1.push(arrayY[exp]);
    cromoEx2.push(arrayZ[exp]);
  }

  //Declaran nuevos cromosomas hijos
  let newCromoH1 = [];
  let newCromoH2 = [];

   // Generar 2 patrones aleatorios de 0s y 1s
  let patron1 = [];
	let patron2 = [];
	for (var i = 0; i < recorrer.length; i++) {
	  patron1.push(Math.floor(Math.random() * 2));
	}
	for (var i = 0; i < recorrer.length; i++) {
	  patron2.push(Math.floor(Math.random() * 2));
	}
  
  // Recorrer los cromosomas y generar el nuevo cromosoma con el patrón
  for (var i = 0; i < cromoEx1.length; i++) {
	  if (patron1[i] === 0) {
	    newCromoH1.push(cromoEx1[i]); //Si es 0 usa el cromoEx1
	  } else {
	    newCromoH1.push(cromoEx2[i]); //Si es 1 usa el cromoEx2
	  }

	  if (patron2[i] === 0) {
	    newCromoH2.push(cromoEx1[i]); //Si es 0 usa el cromoEx1
	  } else {
	    newCromoH2.push(cromoEx2[i]); //Si es 1 usa el cromoEx2
	  }
	}

 	//Mutacion se hace ambos hijos del cruce antes de escoger el mas apto
  if(mutacion == contMutacionn && mutacion != 0)
  {
	  //Escoge la posicion al azar en los genes
		const indiceAleatorio = Math.floor(Math.random() * newCromoH1.length);
		//Escoge un numero aleatorio entre 1 y 9
	  let numeroAleatorio = Math.floor(Math.random() * 9) + 1;
		//Se asegura que el numero al azar no sea al mismo que pretende cambiar

	  while (numeroAleatorio === newCromoH1[indiceAleatorio]) {
	    numeroAleatorio = Math.floor(Math.random() * 9) + 1;
	  }

	  //Se inserta el numero aleatorio en la posicion aleatoria
	  newCromoH1[indiceAleatorio] = numeroAleatorio;

	  //Escoge la posicion al azar en los genes
		const indiceAleatorio2 = Math.floor(Math.random() * newCromoH2.length);
		//Escoge un numero aleatorio entre 1 y 9
	  let numeroAleatorio2 = Math.floor(Math.random() * 9) + 1;

		//Se asegura que el numero al azar no sea al mismo que pretende cambiar
	  while (numeroAleatorio2 === newCromoH2[indiceAleatorio2]) {
	    numeroAleatorio2 = Math.floor(Math.random() * 9) + 1;
	  }

	  //Se inserta el numero aleatorio en la posicion aleatoria
	  newCromoH2[indiceAleatorio2] = numeroAleatorio2;

	}

	//Se rellenan los sudokus con los cromosomas Hijos
  newCromoH1 = rellenandoSudoku(arrayA, newCromoH1);
  newCromoH2 = rellenandoSudoku(arrayA, newCromoH2);
  

  //Se asigna el peso Fitness a cada cromosoma
 	let pesoC1 = fitnessC(newCromoH1);
 	let pesoC2 = fitnessC(newCromoH2);

 	//Variable hijo, esta sera la que entregue la funcion
 	let nHijo = [];

 	//Se escoge el cromosoma de menor peso fitness, es decir, el que tenga menos errores
	if (pesoC2 < pesoC1){
		nHijo = [{cromo: newCromoH2, fit: pesoC2}];
	}else{
		nHijo = [{cromo: newCromoH1, fit: pesoC1}];
	}

 	
	//Retorna el hijo mas optimo		
 	return nHijo;
}

function cruze3(arrayY, arrayZ) { //Cruzamiento dos puntos simetrico.................................................
	
	//Variales para la evaluacion del cromosoma y los los hijos
	let recorrer = arrayEv;  //Obtiene las podiciones de los genes a modificar del cromosoma
	let cromoEx1 = [];
	let cromoEx2 = [];
	let exp;

	// Extrae los genes de cada uno de los padres
	for (var i = 0; i <= recorrer.length - 1; i++) {
		exp = recorrer[i];
    cromoEx1.push(arrayY[exp]);
    cromoEx2.push(arrayZ[exp]);
  }
  
  //Divide cromosoma a partir de las posiciones 4 y 10
  let tamanoArray = cromoEx1.length;
	let puntoCorte1 = 4; // Primer punto de corte después de 4 elementos
	let puntoCorte2 = tamanoArray - 10; // Segundo punto de corte antes de los últimos 10 elementos

	//Divide el primer cromosoma segun las partes anteriores 
	let parteUnoCromo1 = cromoEx1.slice(0, puntoCorte1);
	let parteDosCromo1 = cromoEx1.slice(puntoCorte1, puntoCorte2);
	let parteTresCromo1 = cromoEx1.slice(puntoCorte2);

	//Divide el segundo cromosoma segun las partes anteriores 
	let parteUnoCromo2 = cromoEx2.slice(0, puntoCorte1);
	let parteDosCromo2 = cromoEx2.slice(puntoCorte1, puntoCorte2);
	let parteTresCromo2 = cromoEx2.slice(puntoCorte2);

	//Son tres partes para cada uno: 1-4  |  genes(n)  | ultimos 10

	//Une las tres partes alternando entre los crosomas para crear los hijos
	let newCromoH1 = [...parteUnoCromo1, ...parteDosCromo2, ...parteTresCromo1];
	let newCromoH2 = [...parteUnoCromo2, ...parteDosCromo1, ...parteTresCromo2];

	//Mutacion se hace ambos hijos del cruce antes de escoger el mas apto
  if(mutacion == contMutacionn && mutacion != 0)
  {
	  //Escoge la posicion al azar en los genes
		const indiceAleatorio = Math.floor(Math.random() * newCromoH1.length);
		//Escoge un numero aleatorio entre 1 y 9
	  let numeroAleatorio = Math.floor(Math.random() * 9) + 1;

		//Se asegura que el numero al azar no sea al mismo que pretende cambiar
	  while (numeroAleatorio === newCromoH1[indiceAleatorio]) {
	    numeroAleatorio = Math.floor(Math.random() * 9) + 1;
	  }

	  //Se inserta el numero aleatorio en la posicion aleatoria
	  newCromoH1[indiceAleatorio] = numeroAleatorio;


	  //Escoge la posicion al azar en los genes
		const indiceAleatorio2 = Math.floor(Math.random() * newCromoH2.length);
		//Escoge un numero aleatorio entre 1 y 9
	  let numeroAleatorio2 = Math.floor(Math.random() * 9) + 1;

		//Se asegura que el numero al azar no sea al mismo que pretende cambiar
	  while (numeroAleatorio2 === newCromoH2[indiceAleatorio2]) {
	    numeroAleatorio2 = Math.floor(Math.random() * 9) + 1;
	  }

		//Se inserta el numero aleatorio en la posicion aleatoria
	  newCromoH2[indiceAleatorio2] = numeroAleatorio2;
	}

	//Se rellenan los sudokus con los cromosomas Hijos
  newCromoH1 = rellenandoSudoku(arrayA, newCromoH1);
  newCromoH2 = rellenandoSudoku(arrayA, newCromoH2);
  

	//Se asigna el peso Fitness a cada cromosoma
 	let pesoC1 = fitnessC(newCromoH1);
 	let pesoC2 = fitnessC(newCromoH2);

	//Variable hijo, esta sera la que entregue la funcion
 	let nHijo = [];

	//Se escoge el cromosoma de menor peso fitness, es decir, el que tenga menos errores
	if (pesoC2 < pesoC1){
		nHijo = [{cromo: newCromoH2, fit: pesoC2}];
	}else{
		nHijo = [{cromo: newCromoH1, fit: pesoC1}];
	}

	//Retorna el hijo mas optimo		
 	return nHijo;
}

//Funcion que reemplaza la poblacion actual por los cromosomas elegidos en cada metodo
function reemplazarPolacion(c1, p1, c2, p2, c3, p3, c4, p4, c5, p5, c6, p6, c7, p7, c8, p8, c9, p9, c10, p10){
	cromo1 = c1; fitCromo1 = p1;
	cromo2 = c2; fitCromo2 = p2;
	cromo3 = c3; fitCromo3 = p3;
	cromo4 = c4; fitCromo4 = p4;
	cromo5 = c5; fitCromo5 = p5;
	cromo6 = c6; fitCromo6 = p6;
	cromo7 = c7; fitCromo7 = p7;
	cromo8 = c8; fitCromo8 = p8;
	cromo9 = c9; fitCromo9 = p9;
	cromo10 = c10; fitCromo10 = p10;
}

//Funcion del metodo de seleccion por torneo, encargada de
//Seleccionar 3 cromosomas al azar y elegir el mas apto
function seleccionarTorneo(cromoXFit) {

  // Seleccionar 3 elementos al azar del array
  const randomIndexes = new Set();
  while (randomIndexes.size < 3) {
    const index = Math.floor(Math.random() * cromoXFit.length);
    randomIndexes.add(index);
  }
  
  // Crear array con los elementos seleccionados
  const selectedElements = Array.from(randomIndexes).map(index => cromoXFit[index]);
  
  // Ordenar array de menor a mayor peso
  selectedElements.sort((a, b) => a.fit - b.fit);
  
  // Devolver cromosoma con menor peso y su peso
  return [{cromo: selectedElements[0].cromo, fit: selectedElements[0].fit}];
}


let gene = 1;

do{ //INICIO DEL DO WHILE       --------      INICIO DO WHILE         ----------       INICIO DEL DO WHILE

	contMutacionn++; //Conta +1 en para controlar la mutacion por generaciones

	if (gene == 1) { //Muestra los cromosomas y aptitudes base
		mostrarPoblacion();
	}
		
	//Estos if se encargan de validar si se encuentra la aptitud minima asi como la aptitud 0 que es la solucion
	if(fitCromo1 == 0 || fitCromo1 <= aptituMinima){
		solucion = cromo1;
		fitSolucion = fitCromo1;
		nSolucion = 1;
		break;
	}
	if(fitCromo2 == 0 || fitCromo2 <= aptituMinima){
		solucion = cromo2;
		fitSolucion = fitCromo2;
		nSolucion = 2;
		break;
	}
	if(fitCromo3 == 0 || fitCromo3 <= aptituMinima){
		solucion = cromo3;
		fitSolucion = fitCromo3;
		nSolucion = 3;
		break;
	}
	if(fitCromo4 == 0 || fitCromo4 <= aptituMinima){
		solucion = cromo4;
		fitSolucion = fitCromo4;
		nSolucion = 4;
		break;
	}
	if(fitCromo5 == 0 || fitCromo5 <= aptituMinima){
		solucion = cromo5;
		fitSolucion = fitCromo5;
		nSolucion = 5;
		break;
	}
	if(fitCromo6 == 0 || fitCromo6 <= aptituMinima){
		solucion = cromo6;
		fitSolucion = fitCromo6;
		nSolucion = 6;
		break;
	}
	if(fitCromo7 == 0 || fitCromo7 <= aptituMinima){
		solucion = cromo7;
		fitSolucion = fitCromo7;
		nSolucion = 7;
		break;
	}
	if(fitCromo8 == 0 || fitCromo8 <= aptituMinima){
		solucion = cromo8;
		fitSolucion = fitCromo8;
		nSolucion = 8;
		break;
	}
	if(fitCromo9 == 0 || fitCromo9 <= aptituMinima){
		solucion = cromo9;
		fitSolucion = fitCromo9;
		nSolucion = 9;
		break;
	}
	if(fitCromo10 == 0 || fitCromo10 <= aptituMinima){
		solucion = cromo10;
		fitSolucion = fitCromo10;
		nSolucion = 10;
		break;
	}


	//Podio de los mejores 10 cromosomas ordenados del mas apto al menos apto
	let cromoXFit = [
			  {cromo: cromo1, fit: fitCromo1, id: 1},
			  {cromo: cromo2, fit: fitCromo2, id: 2},
			  {cromo: cromo3, fit: fitCromo3, id: 3},
			  {cromo: cromo4, fit: fitCromo4, id: 4},
			  {cromo: cromo5, fit: fitCromo5, id: 5},
			  {cromo: cromo6, fit: fitCromo6, id: 6},
			  {cromo: cromo7, fit: fitCromo7, id: 7},
			  {cromo: cromo8, fit: fitCromo8, id: 8},
			  {cromo: cromo9, fit: fitCromo9, id: 9},
			  {cromo: cromo10, fit: fitCromo10, id: 10}];

	// Se ordena el array "cromoXFit" de menor a mayor peso
			cromoXFit.sort(function(a, b) {
			  return a.fit - b.fit;
			});

			// Se seleccionan los primeros 6 elementos (los que tienen menor peso)
			let primerosSeis = cromoXFit.slice(0, 10);

			// Se crea un array que solo contenga los cromosomas de los primeros 10 elementos
			let soloId = primerosSeis.map(function(item) {
			  return item.id;
			});

			let soloCromos = primerosSeis.map(function(item) {
			  return item.cromo;
			});

			let soloFit = primerosSeis.map(function(item) {
			  return item.fit;
			});




	switch(selecM){	//Se usa el metedo de seleccion escogido por el usuario.

		case 1: //Elitismo

			if (selecCross == 1) { //Metodo de Cruzamiento 1 Cruzamiento de un punto asimetrico

				//Hijos de los membros de elite
				let hijo1 = cruze1(soloCromos[0], soloCromos[1]);
				let hijo2 = cruze1(soloCromos[2], soloCromos[3]);
				let hijo3 = cruze1(soloCromos[4], soloCromos[5]);
				let hijo4 = cruze1(soloCromos[6], soloCromos[7]);
				
				//Cromosomas que reemplazaran a los actuales, estos son los hijos de elite
				let rCromo1 = hijo1[0].cromo; let rFitCromo1 = hijo1[0].fit;
				let rCromo2 = hijo2[0].cromo; let rFitCromo2 = hijo2[0].fit;
				let rCromo3 = hijo3[0].cromo; let rFitCromo3 = hijo3[0].fit;
				let rCromo4 = hijo4[0].cromo; let rFitCromo4 = hijo4[0].fit;

				//Cromosomas que reemplazaran a los actuales, estos son los padres de elite
				let rCromo5 = soloCromos[0]; let rFitCromo5 = soloFit[0];
				let rCromo6 = soloCromos[1]; let rFitCromo6 = soloFit[1];
				let rCromo7 = soloCromos[2]; let rFitCromo7 = soloFit[2];
				let rCromo8 = soloCromos[3]; let rFitCromo8 = soloFit[3];
				let rCromo9 = soloCromos[4]; let rFitCromo9 = soloFit[4];
				let rCromo10 = soloCromos[5]; let rFitCromo10 = soloFit[5];
		
				//Funcion que reemplaza los cromosomas actuales por los hijos y padres de elite
				reemplazarPolacion( 
					rCromo1 ,  rFitCromo1,
					rCromo2 ,  rFitCromo2,
					rCromo3 ,  rFitCromo3,
					rCromo4 ,  rFitCromo4,
					rCromo5 ,  rFitCromo5,
					rCromo6 ,  rFitCromo6,
					rCromo7 ,  rFitCromo7,
					rCromo8 ,  rFitCromo8,
					rCromo9 ,  rFitCromo9,
					rCromo10,  rFitCromo10);
				}


				if (selecCross == 2) {	//Metodo de Cruzamiento 2 Cruzamiento Uniforme

					//Hijos de los membros de elite
					let hijo1 = cruze2(soloCromos[0], soloCromos[1]);
					let hijo2 = cruze2(soloCromos[2], soloCromos[3]);
					let hijo3 = cruze2(soloCromos[4], soloCromos[5]);
					let hijo4 = cruze2(soloCromos[6], soloCromos[7]);

					//Cromosomas que reemplazaran a los actuales, estos son los hijos de elite
					let rCromo1 = hijo1[0].cromo; let rFitCromo1 = hijo1[0].fit;
					let rCromo2 = hijo2[0].cromo; let rFitCromo2 = hijo2[0].fit;
					let rCromo3 = hijo3[0].cromo; let rFitCromo3 = hijo3[0].fit;
					let rCromo4 = hijo4[0].cromo; let rFitCromo4 = hijo4[0].fit;

					//Cromosomas que reemplazaran a los actuales, estos son los padres de elite
					let rCromo5 = soloCromos[0]; let rFitCromo5 = soloFit[0];
					let rCromo6 = soloCromos[1]; let rFitCromo6 = soloFit[1];
					let rCromo7 = soloCromos[2]; let rFitCromo7 = soloFit[2];
					let rCromo8 = soloCromos[3]; let rFitCromo8 = soloFit[3];
					let rCromo9 = soloCromos[4]; let rFitCromo9 = soloFit[4];
					let rCromo10 = soloCromos[5]; let rFitCromo10 = soloFit[5];

					//Funcion que reemplaza los cromosomas actuales por los hijos y padres de elite
					reemplazarPolacion( 
						rCromo1 ,  rFitCromo1,
						rCromo2 ,  rFitCromo2,
						rCromo3 ,  rFitCromo3,
						rCromo4 ,  rFitCromo4,
						rCromo5 ,  rFitCromo5,
						rCromo6 ,  rFitCromo6,
						rCromo7 ,  rFitCromo7,
						rCromo8 ,  rFitCromo8,
						rCromo9 ,  rFitCromo9,
						rCromo10,  rFitCromo10);
					
				}

				if (selecCross == 3) {	//Metodo de Cruzamiento 3 Cruzamiento de dos puntos asimetrico

					//Hijos de los membros de elite
					let hijo1 = cruze3(soloCromos[0], soloCromos[1]);
					let hijo2 = cruze3(soloCromos[2], soloCromos[3]);
					let hijo3 = cruze3(soloCromos[4], soloCromos[5]);
					let hijo4 = cruze3(soloCromos[6], soloCromos[7]);

					//Cromosomas que reemplazaran a los actuales, estos son los hijos de elite
					let rCromo1 = hijo1[0].cromo; let rFitCromo1 = hijo1[0].fit;
					let rCromo2 = hijo2[0].cromo; let rFitCromo2 = hijo2[0].fit;
					let rCromo3 = hijo3[0].cromo; let rFitCromo3 = hijo3[0].fit;
					let rCromo4 = hijo4[0].cromo; let rFitCromo4 = hijo4[0].fit;

					//Cromosomas que reemplazaran a los actuales, estos son los padres de elite
					let rCromo5 = soloCromos[0]; let rFitCromo5 = soloFit[0];
					let rCromo6 = soloCromos[1]; let rFitCromo6 = soloFit[1];
					let rCromo7 = soloCromos[2]; let rFitCromo7 = soloFit[2];
					let rCromo8 = soloCromos[3]; let rFitCromo8 = soloFit[3];
					let rCromo9 = soloCromos[4]; let rFitCromo9 = soloFit[4];
					let rCromo10 = soloCromos[5]; let rFitCromo10 = soloFit[5];
			
					//Funcion que reemplaza los cromosomas actuales por los hijos y padres de elite
					reemplazarPolacion( 
						rCromo1 ,  rFitCromo1,
						rCromo2 ,  rFitCromo2,
						rCromo3 ,  rFitCromo3,
						rCromo4 ,  rFitCromo4,
						rCromo5 ,  rFitCromo5,
						rCromo6 ,  rFitCromo6,
						rCromo7 ,  rFitCromo7,
						rCromo8 ,  rFitCromo8,
						rCromo9 ,  rFitCromo9,
						rCromo10,  rFitCromo10);
					
				}

			break;

		case 2: //Torneo  ######  Torneo  ######  Torneo  ######  Torneo  ######  Torneo  ######  Torneo  ######
			
			//Se leccionan 20 padres mediante la funcon seleccionar Torneo del Podio de los 10 mejores
			let padre1 = seleccionarTorneo(cromoXFit);
			let padre2 = seleccionarTorneo(cromoXFit);
			let padre3 = seleccionarTorneo(cromoXFit);
			let padre4 = seleccionarTorneo(cromoXFit);
			let padre5 = seleccionarTorneo(cromoXFit);
			let padre6 = seleccionarTorneo(cromoXFit);
			let padre7 = seleccionarTorneo(cromoXFit);
			let padre8 = seleccionarTorneo(cromoXFit);
			let padre9 = seleccionarTorneo(cromoXFit);
			let padre10 = seleccionarTorneo(cromoXFit);
			let padre11 = seleccionarTorneo(cromoXFit);
			let padre12 = seleccionarTorneo(cromoXFit);
			let padre13 = seleccionarTorneo(cromoXFit);
			let padre14 = seleccionarTorneo(cromoXFit);
			let padre15 = seleccionarTorneo(cromoXFit);
			let padre16 = seleccionarTorneo(cromoXFit);
			let padre17 = seleccionarTorneo(cromoXFit);
			let padre18 = seleccionarTorneo(cromoXFit);
			let padre19 = seleccionarTorneo(cromoXFit);
			let padre20 = seleccionarTorneo(cromoXFit);
			
			if (selecCross == 1) {//Metodo de Cruzamiento 1 Cruzamiento de un punto asimetrico

				//Se crean los 10 nuevos hijos mas aptos
				let hijo1 = cruze1(padre1[0].cromo, padre2[0].cromo);
				let hijo2 = cruze1(padre3[0].cromo, padre4[0].cromo);
				let hijo3 = cruze1(padre5[0].cromo, padre6[0].cromo);
				let hijo4 = cruze1(padre7[0].cromo, padre8[0].cromo);
				let hijo5 = cruze1(padre9[0].cromo, padre10[0].cromo);
				let hijo6 = cruze1(padre11[0].cromo, padre12[0].cromo);
				let hijo7 = cruze1(padre13[0].cromo, padre14[0].cromo);
				let hijo8 = cruze1(padre15[0].cromo, padre16[0].cromo);
				let hijo9 = cruze1(padre17[0].cromo, padre18[0].cromo);
				let hijo10 = cruze1(padre19[0].cromo, padre20[0].cromo);
				
				//Los hijos que reemplazaran a los padres
				let rCromo1 = hijo1[0].cromo; let rFitCromo1 = hijo1[0].fit;
				let rCromo2 = hijo2[0].cromo; let rFitCromo2 = hijo2[0].fit;
				let rCromo3 = hijo3[0].cromo; let rFitCromo3 = hijo3[0].fit;
				let rCromo4 = hijo4[0].cromo; let rFitCromo4 = hijo4[0].fit;
				let rCromo5 = hijo5[0].cromo; let rFitCromo5 = hijo5[0].fit;
				let rCromo6 = hijo6[0].cromo; let rFitCromo6 = hijo6[0].fit;
				let rCromo7 = hijo7[0].cromo; let rFitCromo7 = hijo7[0].fit;
				let rCromo8 = hijo8[0].cromo; let rFitCromo8 = hijo8[0].fit;
				let rCromo9 = hijo9[0].cromo; let rFitCromo9 = hijo9[0].fit;
				let rCromo10 = hijo10[0].cromo; let rFitCromo10 = hijo10[0].fit;
				
				//Funcion que reemplaza los cromosomas actuales 
				reemplazarPolacion( 
					rCromo1 ,  rFitCromo1,
					rCromo2 ,  rFitCromo2,
					rCromo3 ,  rFitCromo3,
					rCromo4 ,  rFitCromo4,
					rCromo5 ,  rFitCromo5,
					rCromo6 ,  rFitCromo6,
					rCromo7 ,  rFitCromo7,
					rCromo8 ,  rFitCromo8,
					rCromo9 ,  rFitCromo9,
					rCromo10,  rFitCromo10);

				}

				if (selecCross == 2) {	//Metodo de Cruzamiento 2 Cruzamiento Uniforme

					//Se crean los 10 nuevos hijos mas aptos
					let hijo1 = cruze2(padre1[0].cromo, padre2[0].cromo);
					let hijo2 = cruze2(padre3[0].cromo, padre4[0].cromo);
					let hijo3 = cruze2(padre5[0].cromo, padre6[0].cromo);
					let hijo4 = cruze2(padre7[0].cromo, padre8[0].cromo);
					let hijo5 = cruze2(padre9[0].cromo, padre10[0].cromo);
					let hijo6 = cruze2(padre11[0].cromo, padre12[0].cromo);
					let hijo7 = cruze2(padre13[0].cromo, padre14[0].cromo);
					let hijo8 = cruze2(padre15[0].cromo, padre16[0].cromo);
					let hijo9 = cruze2(padre17[0].cromo, padre18[0].cromo);
					let hijo10 = cruze2(padre19[0].cromo, padre20[0].cromo);
					
					//Los hijos que reemplazaran a los padres
					let rCromo1 = hijo1[0].cromo; let rFitCromo1 = hijo1[0].fit;
					let rCromo2 = hijo2[0].cromo; let rFitCromo2 = hijo2[0].fit;
					let rCromo3 = hijo3[0].cromo; let rFitCromo3 = hijo3[0].fit;
					let rCromo4 = hijo4[0].cromo; let rFitCromo4 = hijo4[0].fit;
					let rCromo5 = hijo5[0].cromo; let rFitCromo5 = hijo5[0].fit;
					let rCromo6 = hijo6[0].cromo; let rFitCromo6 = hijo6[0].fit;
					let rCromo7 = hijo7[0].cromo; let rFitCromo7 = hijo7[0].fit;
					let rCromo8 = hijo8[0].cromo; let rFitCromo8 = hijo8[0].fit;
					let rCromo9 = hijo9[0].cromo; let rFitCromo9 = hijo9[0].fit;
					let rCromo10 = hijo10[0].cromo; let rFitCromo10 = hijo10[0].fit;
					
					//Funcion que reemplaza los cromosomas actuales 
					reemplazarPolacion( 
						rCromo1 ,  rFitCromo1,
						rCromo2 ,  rFitCromo2,
						rCromo3 ,  rFitCromo3,
						rCromo4 ,  rFitCromo4,
						rCromo5 ,  rFitCromo5,
						rCromo6 ,  rFitCromo6,
						rCromo7 ,  rFitCromo7,
						rCromo8 ,  rFitCromo8,
						rCromo9 ,  rFitCromo9,
						rCromo10,  rFitCromo10);

				}

				if (selecCross == 3) {	//Metodo de Cruzamiento 3 Cruzamiento de dos puntos asimetrico

					//Se crean los 10 nuevos hijos mas aptos
					let hijo1 = cruze3(padre1[0].cromo, padre2[0].cromo);
					let hijo2 = cruze3(padre3[0].cromo, padre4[0].cromo);
					let hijo3 = cruze3(padre5[0].cromo, padre6[0].cromo);
					let hijo4 = cruze3(padre7[0].cromo, padre8[0].cromo);
					let hijo5 = cruze3(padre9[0].cromo, padre10[0].cromo);
					let hijo6 = cruze3(padre11[0].cromo, padre12[0].cromo);
					let hijo7 = cruze3(padre13[0].cromo, padre14[0].cromo);
					let hijo8 = cruze3(padre15[0].cromo, padre16[0].cromo);
					let hijo9 = cruze3(padre17[0].cromo, padre18[0].cromo);
					let hijo10 = cruze3(padre19[0].cromo, padre20[0].cromo);
					
					//Los hijos que reemplazaran a los padres
					let rCromo1 = hijo1[0].cromo; let rFitCromo1 = hijo1[0].fit;
					let rCromo2 = hijo2[0].cromo; let rFitCromo2 = hijo2[0].fit;
					let rCromo3 = hijo3[0].cromo; let rFitCromo3 = hijo3[0].fit;
					let rCromo4 = hijo4[0].cromo; let rFitCromo4 = hijo4[0].fit;
					let rCromo5 = hijo5[0].cromo; let rFitCromo5 = hijo5[0].fit;
					let rCromo6 = hijo6[0].cromo; let rFitCromo6 = hijo6[0].fit;
					let rCromo7 = hijo7[0].cromo; let rFitCromo7 = hijo7[0].fit;
					let rCromo8 = hijo8[0].cromo; let rFitCromo8 = hijo8[0].fit;
					let rCromo9 = hijo9[0].cromo; let rFitCromo9 = hijo9[0].fit;
					let rCromo10 = hijo10[0].cromo; let rFitCromo10 = hijo10[0].fit;
					
					//Funcion que reemplaza los cromosomas actuales 
					reemplazarPolacion( 
						rCromo1 ,  rFitCromo1,
						rCromo2 ,  rFitCromo2,
						rCromo3 ,  rFitCromo3,
						rCromo4 ,  rFitCromo4,
						rCromo5 ,  rFitCromo5,
						rCromo6 ,  rFitCromo6,
						rCromo7 ,  rFitCromo7,
						rCromo8 ,  rFitCromo8,
						rCromo9 ,  rFitCromo9,
						rCromo10,  rFitCromo10);
					
				}

			break;

		case 3: //Seleccion Generacional
			
			if (selecCross == 1) {	//Metodo de Cruzamiento 1 Cruzamiento de un punto asimetrico

				//Se crean los hijos para la siguiente generacion
				let hijo1 = cruze1(soloCromos[0], soloCromos[1]);
				let hijo2 = cruze1(soloCromos[2], soloCromos[3]);
				let hijo3 = cruze1(soloCromos[4], soloCromos[5]);
				let hijo4 = cruze1(soloCromos[6], soloCromos[7]);
				let hijo5 = cruze1(soloCromos[8], soloCromos[9]);
				let hijo6 = cruze1(soloCromos[9], soloCromos[0]);
				let hijo7 = cruze1(soloCromos[1], soloCromos[8]);
				let hijo8 = cruze1(soloCromos[3], soloCromos[6]);
				let hijo9 = cruze1(soloCromos[2], soloCromos[7]);
				let hijo10 = cruze1(soloCromos[0], soloCromos[3]);

				//Los hijos que reemplazaran a los padres
				let rCromo1 = hijo1[0].cromo; let rFitCromo1 = hijo1[0].fit;
				let rCromo2 = hijo2[0].cromo; let rFitCromo2 = hijo2[0].fit;
				let rCromo3 = hijo3[0].cromo; let rFitCromo3 = hijo3[0].fit;
				let rCromo4 = hijo4[0].cromo; let rFitCromo4 = hijo4[0].fit;
				let rCromo5 = hijo5[0].cromo; let rFitCromo5 = hijo5[0].fit;
				let rCromo6 = hijo6[0].cromo; let rFitCromo6 = hijo6[0].fit;
				let rCromo7 = hijo7[0].cromo; let rFitCromo7 = hijo7[0].fit;
				let rCromo8 = hijo8[0].cromo; let rFitCromo8 = hijo8[0].fit;
				let rCromo9 = hijo9[0].cromo; let rFitCromo9 = hijo9[0].fit;
				let rCromo10 = hijo10[0].cromo; let rFitCromo10 = hijo10[0].fit;
				
				//Funcion que reemplaza los cromosomas actuales 
				reemplazarPolacion( 
					rCromo1 ,  rFitCromo1,
					rCromo2 ,  rFitCromo2,
					rCromo3 ,  rFitCromo3,
					rCromo4 ,  rFitCromo4,
					rCromo5 ,  rFitCromo5,
					rCromo6 ,  rFitCromo6,
					rCromo7 ,  rFitCromo7,
					rCromo8 ,  rFitCromo8,
					rCromo9 ,  rFitCromo9,
					rCromo10,  rFitCromo10);

				}

				if (selecCross == 2) {	//Metodo de Cruzamiento 2 Cruzamiento Uniforme

					//Se crean los hijos para la siguiente generacion
					let hijo1 = cruze2(soloCromos[0], soloCromos[1]);
					let hijo2 = cruze2(soloCromos[2], soloCromos[3]);
					let hijo3 = cruze2(soloCromos[4], soloCromos[5]);
					let hijo4 = cruze2(soloCromos[6], soloCromos[7]);
					let hijo5 = cruze2(soloCromos[8], soloCromos[9]);
					let hijo6 = cruze2(soloCromos[9], soloCromos[0]);
					let hijo7 = cruze2(soloCromos[1], soloCromos[8]);
					let hijo8 = cruze2(soloCromos[3], soloCromos[6]);
					let hijo9 = cruze2(soloCromos[2], soloCromos[7]);
					let hijo10 = cruze2(soloCromos[0], soloCromos[3]);
					
					//Los hijos que reemplazaran a los padres
					let rCromo1 = hijo1[0].cromo; let rFitCromo1 = hijo1[0].fit;
					let rCromo2 = hijo2[0].cromo; let rFitCromo2 = hijo2[0].fit;
					let rCromo3 = hijo3[0].cromo; let rFitCromo3 = hijo3[0].fit;
					let rCromo4 = hijo4[0].cromo; let rFitCromo4 = hijo4[0].fit;
					let rCromo5 = hijo5[0].cromo; let rFitCromo5 = hijo5[0].fit;
					let rCromo6 = hijo6[0].cromo; let rFitCromo6 = hijo6[0].fit;
					let rCromo7 = hijo7[0].cromo; let rFitCromo7 = hijo7[0].fit;
					let rCromo8 = hijo8[0].cromo; let rFitCromo8 = hijo8[0].fit;
					let rCromo9 = hijo9[0].cromo; let rFitCromo9 = hijo9[0].fit;
					let rCromo10 = hijo10[0].cromo; let rFitCromo10 = hijo10[0].fit;
					
					//Funcion que reemplaza los cromosomas actuales 
					reemplazarPolacion( 
						rCromo1 ,  rFitCromo1,
						rCromo2 ,  rFitCromo2,
						rCromo3 ,  rFitCromo3,
						rCromo4 ,  rFitCromo4,
						rCromo5 ,  rFitCromo5,
						rCromo6 ,  rFitCromo6,
						rCromo7 ,  rFitCromo7,
						rCromo8 ,  rFitCromo8,
						rCromo9 ,  rFitCromo9,
						rCromo10,  rFitCromo10);
					
				}

				if (selecCross == 3) {	//Metodo de Cruzamiento 3 Cruzamiento de dos puntos asimetrico

					//Se crean los hijos para la siguiente generacion
					let hijo1 = cruze3(soloCromos[0], soloCromos[1]);
					let hijo2 = cruze3(soloCromos[2], soloCromos[3]);
					let hijo3 = cruze3(soloCromos[4], soloCromos[5]);
					let hijo4 = cruze3(soloCromos[6], soloCromos[7]);
					let hijo5 = cruze3(soloCromos[8], soloCromos[9]);
					let hijo6 = cruze3(soloCromos[9], soloCromos[0]);
					let hijo7 = cruze3(soloCromos[1], soloCromos[8]);
					let hijo8 = cruze3(soloCromos[3], soloCromos[6]);
					let hijo9 = cruze3(soloCromos[2], soloCromos[7]);
					let hijo10 = cruze3(soloCromos[0], soloCromos[3]);
					
					//Los hijos que reemplazaran a los padres
					let rCromo1 = hijo1[0].cromo; let rFitCromo1 = hijo1[0].fit;
					let rCromo2 = hijo2[0].cromo; let rFitCromo2 = hijo2[0].fit;
					let rCromo3 = hijo3[0].cromo; let rFitCromo3 = hijo3[0].fit;
					let rCromo4 = hijo4[0].cromo; let rFitCromo4 = hijo4[0].fit;
					let rCromo5 = hijo5[0].cromo; let rFitCromo5 = hijo5[0].fit;
					let rCromo6 = hijo6[0].cromo; let rFitCromo6 = hijo6[0].fit;
					let rCromo7 = hijo7[0].cromo; let rFitCromo7 = hijo7[0].fit;
					let rCromo8 = hijo8[0].cromo; let rFitCromo8 = hijo8[0].fit;
					let rCromo9 = hijo9[0].cromo; let rFitCromo9 = hijo9[0].fit;
					let rCromo10 = hijo10[0].cromo; let rFitCromo10 = hijo10[0].fit;
				
					//Funcion que reemplaza los cromosomas actuales 
					reemplazarPolacion( 
						rCromo1 ,  rFitCromo1,
						rCromo2 ,  rFitCromo2,
						rCromo3 ,  rFitCromo3,
						rCromo4 ,  rFitCromo4,
						rCromo5 ,  rFitCromo5,
						rCromo6 ,  rFitCromo6,
						rCromo7 ,  rFitCromo7,
						rCromo8 ,  rFitCromo8,
						rCromo9 ,  rFitCromo9,
						rCromo10,  rFitCromo10);
					
				}

			break; 

		case 4: //Metodo de Seleccion Especial

			//Se usan todo los metodos de seleccion
			if (selecCross == 1 || selecCross == 2 || selecCross == 3) {

				//5 Hijos del metodo de seleccion 1
				let hijo1 = cruze1(soloCromos[0], soloCromos[1]);
			  let hijo2 = cruze1(soloCromos[2], soloCromos[3]);
				let hijo3 = cruze1(soloCromos[4], soloCromos[5]);
				let hijo4 = cruze1(soloCromos[6], soloCromos[7]);
				let hijo5 = cruze1(soloCromos[8], soloCromos[9]);

				//5 Hijos del metodo de seleccion 2
				let hijo6 = cruze2(soloCromos[0], soloCromos[1]);
			  let hijo7 = cruze2(soloCromos[2], soloCromos[3]);
				let hijo8 = cruze2(soloCromos[4], soloCromos[5]);
				let hijo9 = cruze2(soloCromos[6], soloCromos[7]);
				let hijo10 = cruze2(soloCromos[8], soloCromos[9]);

				//5 Hijos del metodo de seleccion 3
				let hijo11 = cruze3(soloCromos[0], soloCromos[1]);
			  let hijo12 = cruze3(soloCromos[2], soloCromos[3]);
				let hijo13 = cruze3(soloCromos[4], soloCromos[5]);
				let hijo14 = cruze3(soloCromos[6], soloCromos[7]);
				let hijo15 = cruze3(soloCromos[8], soloCromos[9]);

				//Se ordenan los pesos de los hijos
				let fitCromo1 = hijo1[0].fit;
				let fitCromo2 = hijo2[0].fit;
				let fitCromo3 = hijo3[0].fit;
				let fitCromo4 = hijo4[0].fit;
				let fitCromo5 = hijo5[0].fit;
				let fitCromo6 = hijo6[0].fit;
				let fitCromo7 = hijo7[0].fit;
				let fitCromo8 = hijo8[0].fit;
				let fitCromo9 = hijo9[0].fit;
				let fitCromo10 = hijo10[0].fit;
				let fitCromo11 = hijo11[0].fit;
				let fitCromo12 = hijo12[0].fit;
				let fitCromo13 = hijo13[0].fit;
				let fitCromo14 = hijo14[0].fit;
				let fitCromo15 = hijo15[0].fit;

				//Se organizan en un nuevo podio los hijos nacidos de las 3 selecciones, del mas apto al menos apto
				let cromo_Fit = [
				  {cromo: hijo1[0].cromo, fit: fitCromo1},
				  {cromo: hijo2[0].cromo, fit: fitCromo2},
				  {cromo: hijo3[0].cromo, fit: fitCromo3},
				  {cromo: hijo4[0].cromo, fit: fitCromo4},
				  {cromo: hijo5[0].cromo, fit: fitCromo5},
				  {cromo: hijo6[0].cromo, fit: fitCromo6},
				  {cromo: hijo7[0].cromo, fit: fitCromo7},
				  {cromo: hijo8[0].cromo, fit: fitCromo8},
				  {cromo: hijo9[0].cromo, fit: fitCromo9},
				  {cromo: hijo10[0].cromo, fit: fitCromo10},
				  {cromo: hijo11[0].cromo, fit: fitCromo11},
				  {cromo: hijo12[0].cromo, fit: fitCromo12},
				  {cromo: hijo13[0].cromo, fit: fitCromo13},
				  {cromo: hijo14[0].cromo, fit: fitCromo14},
				  {cromo: hijo15[0].cromo, fit: fitCromo15}
				  ];

				// Se ordena el array "cromo_Fit" de menor a mayor peso
				cromo_Fit.sort(function(a, b) {
				  return a.fit - b.fit;
				});

				// Se seleccionan los primeros 10 elementos (los que tienen menor peso)
				let primerosDiez = cromo_Fit.slice(0, 10);

				let soloCromos2 = primerosDiez.map(function(item) {
				  return item.cromo;
				});

				let soloFit2 = primerosDiez.map(function(item) {
				  return item.fit;
				});

				//Se organizan los cromosomas que reemplazaran a la siguiente generacion
				let rCromo1 = soloCromos2[0]; let rFitCromo1 = soloFit2[0];
				let rCromo2 = soloCromos2[1]; let rFitCromo2 = soloFit2[1];
				let rCromo3 = soloCromos2[2]; let rFitCromo3 = soloFit2[2];
				let rCromo4 = soloCromos2[3]; let rFitCromo4 = soloFit2[3];
				let rCromo5 = soloCromos2[4]; let rFitCromo5 = soloFit2[4];
				let rCromo6 = soloCromos2[5]; let rFitCromo6 = soloFit2[5];
				let rCromo7 = soloCromos2[6]; let rFitCromo7 = soloFit2[6];
				let rCromo8 = soloCromos2[7]; let rFitCromo8 = soloFit2[7];
				let rCromo9 = soloCromos2[8]; let rFitCromo9 = soloFit2[8];
				let rCromo10 = soloCromos2[9]; let rFitCromo10 = soloFit2[9];
				
				//Funcion que reemplaza los cromosomas actuales 
				reemplazarPolacion( 
					rCromo1 ,  rFitCromo1,
					rCromo2 ,  rFitCromo2,
					rCromo3 ,  rFitCromo3,
					rCromo4 ,  rFitCromo4,
					rCromo5 ,  rFitCromo5,
					rCromo6 ,  rFitCromo6,
					rCromo7 ,  rFitCromo7,
					rCromo8 ,  rFitCromo8,
					rCromo9 ,  rFitCromo9,
					rCromo10,  rFitCromo10);
			}
			
			break;

		default: //Mensaje en caso no se seleccione ningun metodo de seleccion
			document.write("No se escogio ningun metodo de Seleccion")
	}

	gene++;	//Cuenta +1 en el contador de generaciones


	if(contMutacionn == mutacion){//Regresa el contador de mutaciones a 0
		 contMutacionn = 0;
	}//Esto es importante ya que debe mutar en cada cruce pero solo en ciertas generaciones

mostrarPoblacion(); //Muestra los resultados de las generaciones 

}while(gene < genMax); // FIN DO WHILE    - - - - -    FIN DO WHILE    - - - - -    FIN DO WHILE

//En caso no se encuentre la solucion se mostrar el segundo cromosoma del podio que ha llevado hasta el momento
if (solucion == 0 ) {
	//Se crea un podio para escoger al mas apto de los cromosomas
	let cromoXFit = [
			  {cromo: cromo1, fit: fitCromo1, id: 1},
			  {cromo: cromo2, fit: fitCromo2, id: 2},
			  {cromo: cromo3, fit: fitCromo3, id: 3},
			  {cromo: cromo4, fit: fitCromo4, id: 4},
			  {cromo: cromo5, fit: fitCromo5, id: 5},
			  {cromo: cromo6, fit: fitCromo6, id: 6},
			  {cromo: cromo7, fit: fitCromo7, id: 7},
			  {cromo: cromo8, fit: fitCromo8, id: 8},
			  {cromo: cromo9, fit: fitCromo9, id: 9},
			  {cromo: cromo10, fit: fitCromo10, id: 10}];

	// Se ordena el array "cromoXFit" de menor a mayor peso
			cromoXFit.sort(function(a, b) {
			  return a.fit - b.fit;
			});

			// Se seleccionan los primeros 6 elementos (los que tienen menor peso)
			let primerosSeis = cromoXFit.slice(0, 10);

			// Se crea un array que solo contenga los cromosomas de los primeros 10 elementos
			let soloId = primerosSeis.map(function(item) {
			  return item.id;
			});

			let soloCromos = primerosSeis.map(function(item) {
			  return item.cromo;
			});

			let soloFit = primerosSeis.map(function(item) {
			  return item.fit;
			});
			
			//Elementos mas Optimos 
			solucion = soloCromos[0];
			fitSolucion = soloFit[0];
			nSolucion = soloId[0];
}

//Imprime en html los resultados de forma grafica
document.write('<div class="generacion">');
document.write("<H2> RESULTADO </H2>")
document.write("<H3>Cromosoma ",nSolucion,"</H3><br>");
imprimeDADO(solucion);
document.write("<br><H3>Fitness C : ",fitSolucion, "</H3><br>");
document.write('</div>');

//Funcion mostrar poblacion utilizada para mostrar los resultados de cada generacion de cromosomas
function mostrarPoblacion(){

document.write('<div class="generacion">');

	document.write("<H2>GENERACION ", gene, "</H2>")

	document.write("<H3>Cromosoma 1</H3>");
	//imprimeDADO(cromo1);
	document.write("<H3>Fitness C1: ",fitCromo1, "</H3>");

	document.write("<br><H3>Cromosoma 2</H3>");
	//imprimeDADO(cromo2);
	document.write("<H3>Fitness C2: ",fitCromo2, "</H3>");

	document.write("<br><H3>Cromosoma 3</H3>");
	//imprimeDADO(cromo3);
	document.write("<H3>Fitness C3: ",fitCromo3, "</H3>");

	document.write("<br><H3>Cromosoma 4</H3>");
	//imprimeDADO(cromo4);
	document.write("<H3>Fitness C4: ",fitCromo4, "</H3>");

	document.write("<br><H3>Cromosoma 5</H3>");
	//imprimeDADO(cromo5);
	document.write("<H3>Fitness C5: ",fitCromo5, "</H3>");

	document.write("<br><H3>Cromosoma 6</H3>");
	//imprimeDADO(cromo6);
	document.write("<H3>Fitness C6: ",fitCromo6, "</H3>");

	document.write("<br><H3>Cromosoma 7</H3>");
	//imprimeDADO(cromo7);
	document.write("<H3>Fitness C7: ",fitCromo7, "</H3>");

	document.write("<br><H3>Cromosoma 8</H3>");
	//imprimeDADO(cromo8);
	document.write("<H3>Fitness C8: ",fitCromo8, "</H3>");

	document.write("<br><H3>Cromosoma 9</H3>");
	//imprimeDADO(cromo9);
	document.write("<H3>Fitness C9: ",fitCromo9, "</H3>");

	document.write("<br><H3>Cromosoma 10</H3>");
	//imprimeDADO(cromo10);
	document.write("<H3>Fitness C10: ",fitCromo10, "</H3>");

	document.write('</div>');
}


//Funcion que evalua el sudoku, cuenta los errores de las filas, columnas y cuadrantes 3x3
function fitnessC(arrayP){ 
	let array1 = [];            			//Almacena la primera fila
  let k = 0;
  for (var i = 0; i <= 8; i++) {
    array1[k] = arrayP[i];
    k++;
  }
  k = 0;														//Almacena la segunda fila
  let array2 = [];
  for (var i = 9; i <= 17; i++) {
    array2[k] = arrayP[i];
    k++;
  }
  k = 0;
  let array3 = [];									//Almacena la tercera fila
  for (var i = 18; i <= 26; i++) {
    array3[k] = arrayP[i];
    k++;
  }
  k = 0;
  let array4 = [];									//Almacena la cuarta fila
  for (var i = 27; i <= 35; i++) {
    array4[k] = arrayP[i];
    k++;
  }
  k = 0;
  let array5 = [];									//Almacena la quinta fila
  for (var i = 36; i <= 44; i++) {
    array5[k] = arrayP[i];
    k++;
  }
  k = 0;
  let array6 = [];									//Almacena la sexta fila
  for (var i = 45; i <= 53; i++) {
    array6[k] = arrayP[i];
    k++;
  }
  k = 0;
  let array7 = [];									//Almacena la septima fila
  for (var i = 54; i <= 62; i++) {
    array7[k] = arrayP[i];
    k++;
  }
  k = 0;
  let array8 = [];									//Almacena la octava fila
  for (var i = 63; i <= 71; i++) {
    array8[k] = arrayP[i];
    k++;
  }
  k = 0;
  let array9 = [];									//Almacena la novena fila
  for (var i = 72; i <= 80; i++) {
    array9[k] = arrayP[i];
    k++;
  }

  let peso = 0; 										//Variable en la cual se cuentan los errores
	function hayRepetidos(num1, num2, num3, num4, num5, num6, num7, num8, num9)  {
		//Funcion encargada de comprar cada uno de los numeros por cada 9 elementos o numeros
	  if (num1 === num2 || num1 === num3 || num1 === num4 || num1 === num5 || num1 === num6 || num1 === num7 || num1 === num8 || num1 === num9) {
	    peso++;
	    //document.write(" X ");
	  }
	  if (num2 === num3 || num2 === num4 || num2 === num5 || num2 === num6 || num2 === num7 || num2 === num8 || num2 === num9) {
	    peso++;
	    //document.write(" X ");
	  }
	  if (num3 === num4 || num3 === num5 || num3 === num6 || num3 === num7 || num3 === num8 || num3 === num9) {
	    peso++;
	    //document.write(" X ");
	  }
	  if (num4 === num5 || num4 === num6 || num4 === num7 || num4 === num8 || num4 === num9) {
	    peso++;
	    //document.write(" X ");
	  }
	  if (num5 === num6 || num5 === num7 || num5 === num8 || num5 === num9) {
	    peso++;
	    //document.write(" X ");
	  }
	  if (num6 === num7 || num6 === num8 || num6 === num9) {
	    peso++;
	    //document.write(" X ");
	  }
	  if (num7 === num8 || num7 === num9) {
	    peso++;
	    //document.write(" X ");
	  }
	  if (num8 === num9) {
	    peso++;
	    //document.write(" X ");
	  }
	  //document.write("<br>");
	}
	function hayRepetidosY(num1, num2, num3, num4, num5, num6, num7, num8, num9) {
		//Funcion encargada de comprar cada uno de los numeros por cada 9 elementos
		//se ven repetidas y hacen casi lo mismo, la diferencia radica en como se imprimian en pantalla
		//ya que en el inicio del proyecto era necesario saber cuales eran los errores que contaba
	  if (num1 === num2 || num1 === num3 || num1 === num4 || num1 === num5 || num1 === num6 || num1 === num7 || num1 === num8 || num1 === num9) {
	    peso++;
	    //document.write(" X ");
	  }
	  if (num2 === num3 || num2 === num4 || num2 === num5 || num2 === num6 || num2 === num7 || num2 === num8 || num2 === num9) {
	    peso++;
	    //document.write(" X ");
	  }
	  if (num3 === num4 || num3 === num5 || num3 === num6 || num3 === num7 || num3 === num8 || num3 === num9) {
	    peso++;
	    //document.write(" X ");
	  }
	  if (num4 === num5 || num4 === num6 || num4 === num7 || num4 === num8 || num4 === num9) {
	    peso++;
	    //document.write(" X ");
	  }
	  if (num5 === num6 || num5 === num7 || num5 === num8 || num5 === num9) {
	    peso++;
	    //document.write(" X ");
	  }
	  if (num6 === num7 || num6 === num8 || num6 === num9) {
	    peso++;
	    //document.write(" X ");
	  }
	  if (num7 === num8 || num7 === num9) {
	    peso++;
	    //document.write(" X ");
	  }
	  if (num8 === num9) {
	    peso++;
	    //document.write(" X ");
	  }
	}
	//En esta seccion se evaluan las filas
	//document.write(array1);
	hayRepetidos(array1[0],array1[1],array1[2],array1[3],array1[4],array1[5],array1[6],array1[7],array1[8]);
	//document.write(array2);
	hayRepetidos(array2[0],array2[1],array2[2],array2[3],array2[4],array2[5],array2[6],array2[7],array2[8]);
	//document.write(arra//y3);
	hayRepetidos(array3[0],array3[1],array3[2],array3[3],array3[4],array3[5],array3[6],array3[7],array3[8]);
	//document.write(array4);
	hayRepetidos(array4[0],array4[1],array4[2],array4[3],array4[4],array4[5],array4[6],array4[7],array4[8]);
	//document.write(array5);
	hayRepetidos(array5[0],array5[1],array5[2],array5[3],array5[4],array5[5],array5[6],array5[7],array5[8]);
	//document.write(array6);
	hayRepetidos(array6[0],array6[1],array6[2],array6[3],array6[4],array6[5],array6[6],array6[7],array6[8]);
	//document.write(array7);
	hayRepetidos(array7[0],array7[1],array7[2],array7[3],array7[4],array7[5],array7[6],array7[7],array7[8]);
	//document.write(array8);
	hayRepetidos(array8[0],array8[1],array8[2],array8[3],array8[4],array8[5],array8[6],array8[7],array8[8]);
	//document.write(array9);
	hayRepetidos(array9[0],array9[1],array9[2],array9[3],array9[4],array9[5],array9[6],array9[7],array9[8]);
	
	//En esta seccion se evaluan las columnas
	//document.write("<br>Verticales<br>");
	hayRepetidosY(array1[0],array2[0],array3[0],array4[0],array5[0],array6[0],array7[0],array8[0],array9[0]);
	hayRepetidosY(array1[1],array2[1],array3[1],array4[1],array5[1],array6[1],array7[1],array8[1],array9[1]);
	hayRepetidosY(array1[2],array2[2],array3[2],array4[2],array5[2],array6[2],array7[2],array8[2],array9[2]);
	hayRepetidosY(array1[3],array2[3],array3[3],array4[3],array5[3],array6[3],array7[3],array8[3],array9[3]);
	hayRepetidosY(array1[4],array2[4],array3[4],array4[4],array5[4],array6[4],array7[4],array8[4],array9[4]);
	hayRepetidosY(array1[5],array2[5],array3[5],array4[5],array5[5],array6[5],array7[5],array8[5],array9[5]);
	hayRepetidosY(array1[6],array2[6],array3[6],array4[6],array5[6],array6[6],array7[6],array8[6],array9[6]);
	hayRepetidosY(array1[7],array2[7],array3[7],array4[7],array5[7],array6[7],array7[7],array8[7],array9[7]);
	hayRepetidosY(array1[8],array2[8],array3[8],array4[8],array5[8],array6[8],array7[8],array8[8],array9[8]);

	//En esta seccion se evaluan las cuadrante de 3x3 siendo un toral de 9
	//document.write("<br>Cuadrantes<br>");
	hayRepetidos(array1[0],array1[1],array1[2],array2[0],array2[1],array2[2],array3[0],array3[1],array3[2]);
	hayRepetidos(array1[3],array1[4],array1[5],array2[3],array2[4],array2[5],array3[3],array3[4],array3[5]);
	hayRepetidos(array1[6],array1[7],array1[8],array2[6],array2[7],array2[8],array3[6],array3[7],array3[8]);

	hayRepetidos(array4[0],array4[1],array4[2],array5[0],array5[1],array5[2],array6[0],array6[1],array6[2]);
	hayRepetidos(array4[3],array4[4],array4[5],array5[3],array5[4],array5[5],array6[3],array6[4],array6[5]);
	hayRepetidos(array4[6],array4[7],array4[8],array5[6],array5[7],array5[8],array6[6],array6[7],array6[8]);

	hayRepetidos(array7[0],array7[1],array7[2],array8[0],array8[1],array8[2],array9[0],array9[1],array9[2]);
	hayRepetidos(array7[3],array7[4],array7[5],array8[3],array8[4],array8[5],array9[3],array9[4],array9[5]);
	hayRepetidos(array7[6],array7[7],array7[8],array8[6],array8[7],array8[8],array9[6],array9[7],array9[8]);

	
	return peso;  //Retorna el peso o aptitud total del cromosoma
}













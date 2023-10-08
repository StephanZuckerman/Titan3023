// Obtener todos los elementos de la cuadrícula
var cuadricula = document.getElementById("miCuadricula");
var rectangulos = cuadricula.querySelectorAll(".rectangulo");

// Iterar a través de las casillas
rectangulos.forEach(function(rectangulo, index) {
    rectangulo.textContent = "Rectángulo " + (index + 1); 
});

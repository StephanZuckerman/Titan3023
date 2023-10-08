// -- Contiene las funciones para el juego

// Determina la posicion en pantalla de una casilla
function encontrarPosicion(element) {
    var rec = document.getElementById(element).getBoundingClientRect();
    return {top: rec.top + window.scrollY, left: rec.left + window.scrollX};
}

// Comienza el juego
function iniciarJuego(){
    // Arreglo que contiene las casillas, y su inicializacion    
    let casillas = [];

    console.log("Entra a funcion");

    for (let i = 1; i < 52; i++) {
        // Se encuentra la posicion correspondiente en el tablero
        let posicion = encontrarPosicion("casilla"+i.toString());
        // Se instancia una casilla con el numero de iteracion y posiciones X,Y
        const casilla = new Casilla(i, posicion.top, posicion.left);
        // Se agrega la casilla al arreglo
        casillas.push(casilla);    
    }

    console.log("Crea casillas");

    // Paso 1: Crear un nuevo elemento
    var nuevoElemento = document.createElement('p');

    // Paso 2: Configurar el contenido del elemento
    nuevoElemento.textContent = 'Este es un nuevo párrafo';

    // Paso 3: Encontrar el elemento padre al que deseas agregar el nuevo elemento
    var contenedor = document.getElementById('casilla1'); // Cambia 'contenedor' por el ID de tu elemento contenedor

    // Paso 4: Agregar el nuevo elemento al DOM como hijo del elemento padre
    contenedor.appendChild(nuevoElemento);
}

document.addEventListener("DOMContentLoaded", function() {
    // Comienza el juego después de que el DOM se haya cargado
    iniciarJuego();
});

    // Desplaza la posicion del jugador en una casilla
function moverJugador(jugador, desplazamiento){
    for (let i = jugador.posicion; i < desplazamiento; i++) {
        // Se elimina al jugador de la casilla actual
        setTimeout(casillas[jugador.posicion-1].alterarCasilla(jugador.id_j), 1000);
        // Se registra al jugador en la siguiente
        setTimeout(casillas[jugador.posicion].alterarCasilla(jugador.id_j), 1000);
    }
}
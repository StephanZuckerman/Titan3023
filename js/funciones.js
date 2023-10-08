// -- Contiene las funciones para el juego

// Arreglo que contiene las casillas, y su inicializacion
let casillas = [];

for (let i = 1; i < 52; i++) {
    // Se encuentra la posicion correspondiente en el tablero
    let posicion = encontrarPosicion("casilla"+i.toString());
    // Se instancia una casilla con el numero de iteracion y posiciones X,Y
    const casilla = new Casilla(i, posicion.top, posicion.left);
    // Se agrega la casilla al arreglo
    casillas.append(casilla);    
}

// Desplaza la posicion del jugador en una casilla
function moverJugador(jugador, desplazamiento){
    for (let i = jugador.posicion; i < desplazamiento; i++) {
        // Se elimina al jugador de la casilla actual
        setTimeout(casilla[jugador.posicion-1].alterarCasilla(jugador.id_j), 1000);
        // Se registra al jugador en la siguiente
        setTimeout(casilla[jugador.posicion].alterarCasilla(jugador.id_j), 1000);
    }
}

// Determina la posicion en pantalla de una casilla
function encontrarPosicion(element) {
    var rec = document.getElementById(element).getBoundingClientRect();
    return {top: rec.top + window.scrollY, left: rec.left + window.scrollX};
  }
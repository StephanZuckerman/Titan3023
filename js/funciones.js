// -- Contiene las funciones para el juego

// Arreglo que contiene las casillas, y su inicializacion    
let casillas = [];

// Funcion para generar esperas
function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Determina la posicion en pantalla de una casilla
function encontrarPosicion(element) {
    var rec = document.getElementById(element).getBoundingClientRect();
    return {top: rec.top + window.scrollY, left: rec.left + window.scrollX};
}

// Desplaza la posicion del jugador en una casilla
async function moverJugador(jugador, desplazamiento){
    for (let i = 0; i < desplazamiento; i++) {
        // Se elimina al jugador de la casilla actual
        await esperar(500);
        let casillaActual = document.getElementById("t_c"+jugador.id_j);
        casillaActual.remove()

        // Se registra al jugador en la siguiente
        await esperar(500);
        jugador.posicion++;
        let conSig = document.getElementById("casilla"+jugador.posicion);
        let casillaSiguiente = document.createElement('p');
        casillaSiguiente.id = "t_c"+jugador.id_j
        casillaSiguiente.textContent = "Jugador "+jugador.id_j
        conSig.appendChild(casillaSiguiente);
    }
}

// Comienza el juego
async function iniciarJuego(){

    for (let i = 1; i < 52; i++) {
        // Se encuentra la posicion correspondiente en el tablero
        let posicion = encontrarPosicion("casilla"+i.toString());
        // Se instancia una casilla con el numero de iteracion y posiciones X,Y
        const casilla = new Casilla(i, posicion.top, posicion.left);
        // Se agrega la casilla al arreglo
        casillas.push(casilla);    
    }

    jug_t = new Jugador(1)
    
    // Paso 1: Crear un nuevo elemento
    let cas1 = document.createElement('p');
    // Se le agrega un id para cuando sea removido
    cas1.id="t_c1"

    // Paso 2: Configurar el contenido del elemento
    cas1.textContent = 'Jugador 1';

    // Paso 3: Encontrar el elemento padre al que deseas agregar el nuevo elemento
    let con1 = document.getElementById('casilla1');

    // Paso 4: Agregar el nuevo elemento al DOM como hijo del elemento padre
    con1.appendChild(cas1);

    /* // Paso 5: Cambiamos el contener para apuntar al elemento creado
    con1 = document.getElementById('t_c1');
    
    // Paso 6: Removemos el elemento
    con1.remove();  */

    let desplazamiento = jug_t.tirarDado();
    console.log("jugador se movera "+desplazamiento+" casillas")
    moverJugador(jug_t, desplazamiento)
}

document.addEventListener("DOMContentLoaded", function() {
    // Comienza el juego después de que el DOM se haya cargado
    iniciarJuego();
});
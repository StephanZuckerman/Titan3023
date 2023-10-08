// -- Contiene las funciones para el juego

// Arreglos que contienen los objetos del juego    
let casillas = [];
let jugadores = [];

// Varibale de control para saber cuando un jugador dejó de moverse
let movido = 0

// Funcion para generar esperas
function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Detiene la tirada de un jugador hasta que el anteior termina
function esperarMovimiento() {
    return new Promise(resolve => {
      const intervalo = setInterval(() => {
        if (movido === 1) {
          clearInterval(intervalo);
          resolve();
        }
      }, 500); // Verificar cada 100 milisegundos si movido cambió
    });
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

        // Identifica la ficha antigua del jugador
        let casillaActual = document.getElementById("t_c"+jugador.id_j);
        
        // Elimia la ficha del jugador
        casillaActual.remove()

        // Se registra al jugador en la siguiente
        await esperar(500);
        
        // Aumenta la posicion del jugador
        jugador.posicion++;
        
        // Identifica la casilla a la que llego
        let conSig = document.getElementById("casilla"+jugador.posicion);
        
        // Crea la nueva ficha para representar al jugador
        let casillaSiguiente = document.createElement('p');
        
        // Se agrega el id para identificarla con el jugador
        casillaSiguiente.id = "t_c"+jugador.id_j

        // Le colocamos el texto 
        casillaSiguiente.textContent = "Jugador "+jugador.id_j
        
        // Se añade la ficha a la casilla
        conSig.appendChild(casillaSiguiente);
    }

    // Se indica que termianron los movimientos
    movido = 1;
}

// Comienza el juego
async function iniciarJuego(){

    // Inicializa las casillas
    for (let i = 1; i < 52; i++) {
        // Se encuentra la posicion correspondiente en el tablero
        let posicion = encontrarPosicion("casilla"+i.toString());
        
        // Se instancia una casilla con el numero de iteracion y posiciones X,Y
        const casilla = new Casilla(i, posicion.top, posicion.left);
        
        // Se agrega la casilla al arreglo
        casillas.push(casilla);    
    }

    // Inicializa los jugadores
    for (let i = 0; i < 4; i++) {
        // Se instancia al jugador y se agrega al arreglo
        const jugador = new Jugador(i+1)
        jugadores.push(jugador);
    
        // Paso 1: Crear un nuevo elemento, que representara la posicion del jugador
        let ficha = document.createElement('p');
        
        // Se le agrega un id referente al jugador que representa
        ficha.id="t_c"+(i+1)

        // Paso 2: Configurar el contenido del elemento
        ficha.textContent = "Jugador "+(i+1);

        // Paso 3: Encontrar el elemento padre al que deseas agregar el nuevo elemento
        // Todos los jugadores inician en la casilla 1
        let casilla = document.getElementById("casilla1");

        // Paso 4: Agregar la ficha del jugador a la casilla
        casilla.appendChild(ficha);
    }
    
    // Primer ronda de tiradas
    for (let i = 0; i < 4; i++) {
        // Se reinicia la bandera para el nuevo jugador
        movido = 0

        // El jugador lanza el dado
        let desplazamiento = jugadores[i].tirarDado();
        
        console.log("jugador "+jugadores[i].id_j+" se movera "+desplazamiento+" casillas")
        
        // Se realiza el desplazamientp
        moverJugador(jugadores[i], desplazamiento);
        
        // El siguiente jugador no incia hasta que termine el turno anterior
        await esperarMovimiento();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Comienza el juego después de que el DOM se haya cargado
    iniciarJuego();
});
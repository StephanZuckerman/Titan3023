class Casilla{

    constructor(id_c, posX, posY){
        this.id_c = id_c;
        this.posX = posX;
        this.posY = posY;
        this.jugadores = [0,0,0,0] 
    }

    /** Métodos */
    
    // Cambia el valor de 
    alterarCasilla(jugador){
    // Cambiamos el valor de la casilla
    this.jugadores[jugador-1] = !this.jugadores[jugador-1];    
}
}
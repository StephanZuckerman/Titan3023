
class Jugador {
    constructor(id_j) {
        this.id_j = id_j;
        this.posicion = 1;
    }

    /** Método */
    tirarDado() { // Usa la sintaxis de función tradicional para definir métodos
        return Math.ceil(Math.random() * 6);
    }
}

class Dron {
  constructor(ordenes = [], nombreArchivo) {
    this.ordenes = ordenes;
    this.y = 0;
    this.x = 0;
    this.geo = 'N';
    this.nombreArchivo = nombreArchivo;
  }
}

module.exports = Dron;

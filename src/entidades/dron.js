class Dron {
  constructor(ordenes = []) {
    this.ordenes = ordenes;
    this.y = 0;
    this.x = 0;
    this.geo = 'N';
  }
}

module.exports = Dron;

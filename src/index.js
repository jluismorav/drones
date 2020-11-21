const { leerInstrucciones } = require('./metodos');
const fs = require('fs');
const path = require('path');
const directoryPath = './drones';
const Dron = require('./entidades/dron');

(async () => {
  try {
    const files = fs.readdirSync(directoryPath);
    const drones = [];
    for (const item of files) {
      drones.push(
        new Dron(await leerInstrucciones(path.join(directoryPath, item)))
      );
    }
  } catch (err) {
    console.log(err);
  }
})();

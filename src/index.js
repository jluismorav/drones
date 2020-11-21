const { readIntruccionToDrone, delivery } = require('./metodos');
const fs = require('fs');
const directoryPath = './drones';
const path = require('path');
const Dron = require('./entidades/dron');

(async () => {
  try {
    const files = fs.readdirSync(directoryPath);
    const drones = [];
    for (const item of files) {
      drones.push(
        new Dron(await readIntruccionToDrone(path.join(directoryPath, item)))
      );
    }

    delivery(drones[0]);
  } catch (err) {
    console.log(err);
  }
})();

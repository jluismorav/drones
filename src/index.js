const {
  leerInstrucciones,
  repartir,
  generarReporteEntregas,
} = require('./metodos');
const fs = require('fs');
const path = require('path');
const directorio = './drones';
const Dron = require('./entidades/dron');

(async () => {
  try {
    const archivos = fs.readdirSync(directorio);
    let dron;
    let resultadoRepartir;

    for (const archivo of archivos) {
      dron = new Dron(
        await leerInstrucciones(path.join(directorio, archivo)),
        archivo
      );
      resultadoRepartir = await repartir(dron);
      await generarReporteEntregas({ ...resultadoRepartir, directorio });
    }
  } catch (err) {
    console.log(err);
  }
})();

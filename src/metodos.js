const fs = require('fs');
const path = require('path');
const readline = require('readline');

const leerInstrucciones = async (file) => {
  const fileStream = fs.createReadStream(file);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  const intructions = [];
  for await (const line of rl) {
    intructions.push(line.split(''));
  }
  return intructions;
};

const girar = async ({ geo, move }) => {
  let newGeo;
  switch (geo) {
  case 'N':
    newGeo = move == 'D' ? 'E' : 'O';
    break;
  case 'E':
    newGeo = move == 'D' ? 'S' : 'N';
    break;
  case 'S':
    newGeo = move == 'D' ? 'O' : 'E';
    break;
  case 'O':
    newGeo = move == 'D' ? 'N' : 'S';
    break;
  }
  return newGeo;
};

const repartir = async (dron) => {
  let entregas = [];
  for (const orden of dron.ordenes) {
    for (const intruccion of orden) {
      if (intruccion == 'A') {
        switch (dron.geo) {
        case 'N':
          dron.y = dron.y + 1;
          break;
        case 'E':
          dron.x = dron.x + 1;
          break;
        case 'S':
          dron.y = dron.y - 1;
          break;
        case 'O':
          dron.x = dron.x - 1;
          break;
        }
      } else if (intruccion == 'D' || intruccion == 'I') {
        dron.geo = await girar({ geo: dron.geo, move: intruccion });
      }
    }
    entregas.push({ x: dron.x, y: dron.y, orientacion: dron.geo });
  }
  return { dron, entregas };
};

const generarReporteEntregas = async ({ directorio, dron, entregas }) => {
  const nombreArchivoReporte = `out${dron.nombreArchivo
    .match(/(\d+)/g)
    .join()}.txt`;
  const rutaArchivoReporte = path.join(directorio, nombreArchivoReporte);

  if (fs.existsSync(rutaArchivoReporte)) fs.unlinkSync(rutaArchivoReporte);

  fs.appendFileSync(rutaArchivoReporte, '== Reporte de entregas == \n');

  for (const entrega of entregas) {
    fs.appendFileSync(
      rutaArchivoReporte,
      `(${entrega.x}, ${entrega.y})\t${entrega.orientacion} \n`
    );
  }
  return {
    contenidoReporte: fs.readFileSync(rutaArchivoReporte, 'utf8'),
    nombreArchivoReporte,
  };
};

module.exports = { leerInstrucciones, girar, repartir, generarReporteEntregas };

const fs = require('fs');
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
  }
};

module.exports = { leerInstrucciones, girar, repartir };

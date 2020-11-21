const { expect } = require('chai');
const path = require('path');
const Dron = require('../src/entidades/dron');
const {
  repartir,
  generarReporteEntregas,
  leerInstrucciones,
} = require('../src/metodos');

describe('Drones', () => {
  const directorio = './test/recursos/';
  it(`Dado un dron con las intrucciones in01.txt
    AAAAIAA
    DDDAIAD
    AAIADAD
    1. El dron debera empezar en y0 x0 orientacion Norte y archivo asignado con intrucciones
    2.1 Para AAAAIAA la entrega sera en { x: -2, y: 4, orientacion: 'O' }
    2.2 Para DDDAIAD la entrega sera en { x: -1, y: 3, orientacion: 'S' }
    2.3 Para AAIADAD la entrega sera en { x: 0, y: 0, orientacion: 'O' }

    3. El archivo resultante debe ser out01.txt con el siguiente contenido:
    == Reporte de entregas == 
    (-2, 4)	O 
    (-1, 3)	S 
    (0, 0)	O 

    `, async () => {
    const archivo = 'in01.txt';
    const dron = new Dron(
      await leerInstrucciones(path.join(directorio, 'in01.txt')),
      archivo
    );

    expect(dron)
      .to.be.an('object')
      .and.to.be.eqls({
        ordenes: [
          ['A', 'A', 'A', 'A', 'I', 'A', 'A'],
          ['D', 'D', 'D', 'A', 'I', 'A', 'D'],
          ['A', 'A', 'I', 'A', 'D', 'A', 'D'],
        ],
        y: 0,
        x: 0,
        geo: 'N',
        nombreArchivo: 'in01.txt',
      });

    const resultadoRepartir = await repartir(dron);

    expect(resultadoRepartir.entregas)
      .to.be.an('array')
      .and.to.be.eqls([
        { x: -2, y: 4, orientacion: 'O' },
        { x: -1, y: 3, orientacion: 'S' },
        { x: 0, y: 0, orientacion: 'O' },
      ]);

    const {
      contenidoReporte,
      nombreArchivoReporte,
    } = await generarReporteEntregas({
      ...resultadoRepartir,
      directorio,
    });

    expect(nombreArchivoReporte)
      .to.be.an('string')
      .to.be.eqls('out01.txt');
    expect(contenidoReporte)
      .to.be.an('string')
      .to.be.eqls(
        '== Reporte de entregas == \n(-2, 4)\tO \n(-1, 3)\tS \n(0, 0)\tO \n'
      );
  });
});

const { expect } = require('chai');
const Dron = require('../src/entidades/dron');
const { PUNTO_CARDINAL } = require('../src/constantes');
const { generarReporteEntregas } = require('../src/metodos');

const directorio = './test/recursos/';

describe('generarReporteEntregas', () => {
  it(`Un dron que toma las intrucciones de un archivo con nombre in01.txt, 
  el archivo debe tener el nombre out01.txt el contenido:
  == Reporte de entregas == 
  (-2, 4)	O 
  (-1, 3)	S 
  (0, 0)	O  `, async () => {
    const reporteEntrega = {
      directorio,
      dron: new Dron([], 'in01.txt'),
      entregas: [
        { x: -2, y: 4, orientacion: PUNTO_CARDINAL.OESTE },
        { x: -1, y: 3, orientacion: PUNTO_CARDINAL.SUR },
        { x: 0, y: 0, orientacion: PUNTO_CARDINAL.OESTE },
      ],
    };
    const {
      contenidoReporte,
      nombreArchivoReporte,
    } = await generarReporteEntregas(reporteEntrega);
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

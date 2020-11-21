const { expect } = require('chai');

const { leerInstrucciones } = require('../src/metodos');

const directoryPath = './test/recursos/in01.txt';

describe('leerInstrucciones', () => {
  it('Al leer un archivo este debe devover un arreglo de instrucciones y cada linea se interpreta como un arreglo de pasos', async () => {
    const result = await leerInstrucciones(directoryPath);
    expect(result).to.be.an('array');
    expect(result.length).to.be.equal(3);
    expect(result[0])
      .to.be.an('array')
      .and.to.eql(['A', 'A', 'A', 'A', 'I', 'A', 'A']);
    expect(result[1])
      .to.be.an('array')
      .and.to.eql(['D', 'D', 'D', 'A', 'I', 'A', 'D']);
    expect(result[2])
      .to.be.an('array')
      .and.to.eql(['A', 'A', 'I', 'A', 'D', 'A', 'D']);
  });
});

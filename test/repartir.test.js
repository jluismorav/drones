const { expect } = require('chai');
const Dron = require('../src/entidades/dron');
const { PUNTO_CARDINAL } = require('../src/constantes');
const { repartir } = require('../src/metodos');

describe('Repartir', () => {
  it(`Dado un  dron con las intrucciones 'A', 'A', 'A', 'A', 'I', 'A', 'A' 
  debera finalizar en la posicion x:-2 y:4 orientacion:[O]este`, async () => {
    const dron = new Dron([['A', 'A', 'A', 'A', 'I', 'A', 'A']]);
    const result = await repartir(dron);
    expect(result).to.be.an('array').and.is.not.empty;
    expect(result[0])
      .to.be.an('object')
      .and.to.eql({ x: -2, y: 4, orientacion: PUNTO_CARDINAL.OESTE });
  });

  it(`Dado un dron con las intrucciones 'D', 'D', 'D', 'A', 'I', 'A', 'D' 
  debera finalizar en la posicion x:-2 y:4 orientacion:[O]este`, async () => {
    const dron = new Dron([['D', 'D', 'D', 'A', 'I', 'A', 'D']]);
    const result = await repartir(dron);

    expect(result).to.be.an('array').and.is.not.empty;
    expect(result[0])
      .to.be.an('object')
      .and.to.eql({ x: -1, y: -1, orientacion: PUNTO_CARDINAL.OESTE });
  });

  it(`Dado un dron con las intrucciones 'A', 'A', 'I', 'A', 'D', 'A', 'D'
  debera finalizar en la posicion x:-2 y:4 orientacion:[O]este`, async () => {
    const dron = new Dron([['A', 'A', 'I', 'A', 'D', 'A', 'D']]);
    const result = await repartir(dron);

    expect(result).to.be.an('array').and.is.not.empty;
    expect(result[0])
      .to.be.an('object')
      .and.to.eql({ x: -1, y: 3, orientacion: PUNTO_CARDINAL.ESTE });
  });

  it(`Dado un dron con las intrucciones 'A', 'A', 'A', 'A', 'I', 'A', 'A' debera finalizar en la posicion x:-2 y:4 orientacion:[O]este  
  luego continuar con 'D', 'D', 'D', 'A', 'I', 'A', 'D' debera finalizar en la posicion  x: -1, y: 3, orientacion: [S]ur
  luego continuar con 'A', 'A', 'I', 'A', 'D', 'A', 'D' debera finalizar en la posicion  x: 0, y: 0, orientacion: '[O]este `, async () => {
    const dron = new Dron([
      ['A', 'A', 'A', 'A', 'I', 'A', 'A'],
      ['D', 'D', 'D', 'A', 'I', 'A', 'D'],
      ['A', 'A', 'I', 'A', 'D', 'A', 'D'],
    ]);
    const result = await repartir(dron);

    expect(result)
      .to.be.an('array')
      .and.to.eql([
        { x: -2, y: 4, orientacion: 'O' },
        { x: -1, y: 3, orientacion: 'S' },
        { x: 0, y: 0, orientacion: 'O' },
      ]);
  });
});

const { expect } = require('chai');
const { PUNTO_CARDINAL, GIRAR } = require('../src/constantes');
const { girar } = require('../src/metodos');

describe('girar', () => {
  it('Cuando el dron esta mirando al Norte y gira a la Derecha, debe quedar mirando a hacia el Este', async () => {
    const result = await girar({
      geo: PUNTO_CARDINAL.NORTE,
      move: GIRAR.DERECHA,
    });
    expect(result).to.be.equal(PUNTO_CARDINAL.ESTE);
  });
  it('Cuando el dron esta mirando al Este y gira a la Derecha, debe quedar mirando a hacia el Sur', async () => {
    const result = await girar({
      geo: PUNTO_CARDINAL.ESTE,
      move: GIRAR.DERECHA,
    });
    expect(result).to.be.equal(PUNTO_CARDINAL.SUR);
  });
  it('Cuando el dron esta mirando al Sur y gira a la Derecha, debe quedar mirando a hacia el Oeste', async () => {
    const result = await girar({
      geo: PUNTO_CARDINAL.SUR,
      move: GIRAR.DERECHA,
    });
    expect(result).to.be.equal(PUNTO_CARDINAL.OESTE);
  });
  it('Cuando el dron esta mirando al Oeste y gira a la Derecha, debe quedar mirando a hacia el Norte', async () => {
    const result = await girar({
      geo: PUNTO_CARDINAL.OESTE,
      move: GIRAR.DERECHA,
    });
    expect(result).to.be.equal(PUNTO_CARDINAL.NORTE);
  });

  it('Cuando el dron esta mirando al Norte y gira a la izquierda, debe quedar mirando a hacia el Oeste', async () => {
    const result = await girar({
      geo: PUNTO_CARDINAL.NORTE,
      move: GIRAR.IZQUIERDA,
    });
    expect(result).to.be.equal(PUNTO_CARDINAL.OESTE);
  });
  it('Cuando el dron esta mirando al Oeste y gira a la izquierda, debe quedar mirando a hacia el Sur', async () => {
    const result = await girar({
      geo: PUNTO_CARDINAL.OESTE,
      move: GIRAR.IZQUIERDA,
    });
    expect(result).to.be.equal(PUNTO_CARDINAL.SUR);
  });
  it('Cuando el dron esta mirando al Sur y gira a la izquierda, debe quedar mirando a hacia el Este', async () => {
    const result = await girar({
      geo: PUNTO_CARDINAL.SUR,
      move: GIRAR.IZQUIERDA,
    });
    expect(result).to.be.equal(PUNTO_CARDINAL.ESTE);
  });
  it('Cuando el dron esta mirando al Este y gira a la izquierda, debe quedar mirando a hacia el Norte', async () => {
    const result = await girar({
      geo: PUNTO_CARDINAL.ESTE,
      move: GIRAR.IZQUIERDA,
    });
    expect(result).to.be.equal(PUNTO_CARDINAL.NORTE);
  });
});

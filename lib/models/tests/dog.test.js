const Dog = require('../dog');
const mongoose = require('mongoose');

describe('Dog Model', () => {

  it('valid model all properties', () => {
    const data = {
      name: 'Kenobi',
      appearances: {
        pattern: 'blue merle',
        mainColor: 'white'
      },
      toys: 10,
      hasBestFriend: true,
      Treats: ['bones', 'peanut butter'],
      lengthOfLife: 20,
    };

    const dog = new Dog(data);
    const errors = dog.validateSync();
    expect(errors).toBeUndefined();

    const json = dog.toJSON();

    expect(json).toEqual({
      ...data,
      _id: expect.any(Object),
    });
  });
  
  it('validates required properties', () => {

  });
  it('populates default properties', () => {

  });
  it('Enforces max number of toys', () => {

  });
  it('Enforces min number of toys', () => {

  });
  it('Enforces enum on media', () => {

  });

});
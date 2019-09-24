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
    const data = {};
    const dog = new Dog(data);
    const { errors } = dog.validateSync();
    expect(errors.name.kind).toBe('required');
    expect(errors.toys.kind).toBe('required');
    expect(errors.lengthOfLife.kind).toBe('required');
    expect(errors['appearances.mainColor'].kind).toBe('required');
  });

  it('populates default properties', () => {
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
    const err = dog.validateSync();
    expect(err).toBeUndefined();

    expect(dog.hasBestFriend).toEqual(true);
  });

  it('Enforces max number of toys', () => {
    const data = {
      toys: 11
    };
    const dog = new Dog(data);
    const { errors } = dog.validateSync();
    expect(errors.toys.kind).toBe('max');
  });

  it('Enforces min number of toys', () => {
    const data = {
      toys: -11
    };
    const dog = new Dog(data);
    const { errors } = dog.validateSync();
    expect(errors.toys.kind).toBe('min');
  });

  it('Enforces enum on treats', () => {
    const data = {
      enum: ['icecream']
    };
    const dog = new Dog(data);
    const { errors } = dog.validateSync();
    console.log(errors);
    expect(errors['treats.0'].kind).toBe('enum');
  });

});
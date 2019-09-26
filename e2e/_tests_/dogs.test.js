const request = require('../request');
const db = require('../db');

describe('dogs api', () => {

  beforeEach(() => {
    return db.dropCollection('dogs');
  });

  const kenobi = {
    name: 'Kenobi',
    appearances: {
      pattern: 'blue merle',
      mainColor: 'white'
    },
    toys: 10,
    hasBestFriend: true,
    treats: ['bones', 'peanut butter'],
    lengthOfLife: 20,
  };

  function postDog(dog) {
    return request
      .post('/api/dogs')
      .send(dog)
      .expect(200)
      .then(({ body }) => body);
  }

  it('post a dog', () => {
    return postDog(kenobi)
      .then(dog => {
        expect(dog).toEqual({
          _id: expect.any(String),
          __v: 0,
          ...kenobi
        });
      });
  });

  it('gets a dog by id', () => {
    return postDog(kenobi)
      .then(dog => {
        console.log(dog);
        
        return request
          .get(`/api/dogs/${dog._id}`)
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual(dog);
          });
      });
  });

  it('gets a list of dogs', () => {
    return Promise.all([
      postDog({ name: 'dog 1', toys: 10, lengthOfLife: 20 }),
      postDog({ name: 'dog 2', toys: 10, lengthOfLife: 20 }),
      postDog({ name: 'dog 3', toys: 10, lengthOfLife: 20 })
    ])
      .then(() => {
        return request
          .get('/api/dogs')
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(3);
      });
  });

  it('updates a dog', () => {
    return postDog(kenobi)
      .then(dog => {
        dog.toys = 5;
        return request
          .put(`/api/dogs/${dog._id}`)
          .send(dog)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.toys).toBe(5);
      });
  });

  it('deletes a dog', () => {
    return postDog(kenobi)
      .then(dog => {
        return request
          .delete(`/api/dogs/${dog._id}`)
          .expect(200);
      });
  });

});
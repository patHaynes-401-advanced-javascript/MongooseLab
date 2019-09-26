/* eslint-disable new-cap */
const router = require('express').Router();
const Dog = require('../models/dog');

router
  .post('/', (req, res, next) => {
    Dog.create(req.body)
      .then(dog => res.json(dog))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    console.log(req.params.id);
    

    Dog.findById(req.params.id)
      .then(dog => res.json(dog))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Dog.find()
      .then(dogs => res.send(dogs))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Dog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .then(dog => res.send(dog))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Dog.findByIdAndRemove(req.params.id)
      .then(dog => res.send(dog))
      .catch(next);
  });

module.exports = router;
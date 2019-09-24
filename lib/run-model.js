require('dotenv').config();
const connect = require('./lib/connect');
// const mongoose = require('mongoose');

connect();

// const Dog = require('./lib/model/dog');

// Dog.create({
//   name: 'Summit',
//   toys: 4
// })
//   .then(createDog => {
//     console.log(createdDog);
//   })
//   .then(() => {
//     mongoose.disconnect();
//   });
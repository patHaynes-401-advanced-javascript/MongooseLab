const { connection } = require('mongoose');
const state = require('mongoose/lib/connectionstate');

module.exports = (req, res, next) => {
  if(connection.readyState !== state.connected) {
    next({
      statusCode: 500,
      error: 'database not available'
    });
  }
  else next();
};
const crudControllers = require('../crud.js');
const Item = require('./model.js');
require('../../database/index.js');

module.exports = crudControllers(Item);
const crudControllers = require('../crud.js');
const List = require('./model.js');
require('../../database/index.js');

module.exports = crudControllers(List);
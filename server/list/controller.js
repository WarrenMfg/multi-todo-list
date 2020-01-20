const crudControllers = require('../crud.js');
const db = require('../../database/index.js');

module.exports = crudControllers(db.List);
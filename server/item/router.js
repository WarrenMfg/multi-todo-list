const itemRouter = require('express').Router();
const controller = require('./controller.js');

// '/one' routes
itemRouter.route('/one')
  .get(controller.getOne)
  .post(controller.createOne)
  .put(controller.updateOne)
  .delete(controller.removeOne);

// '/many' routes
itemRouter.route('/many')
  .get(controller.getMany);

module.exports = itemRouter;

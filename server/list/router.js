const listRouter = require('express').Router();
const controller = require('./controller.js');

// '/one' routes
listRouter.route('/one/:id')
  .get(controller.getOne)
  .post(controller.createOne) // don't need list id
  .put(controller.updateOne)
  .delete(controller.removeOne);

// '/many' routes
listRouter.route('/many/:id')
  .get(controller.getMany);

module.exports = listRouter;
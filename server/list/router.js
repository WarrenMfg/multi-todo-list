const listRouter = require('express').Router();
const controller = require('./controller.js');

// '/one' routes
listRouter.route('/one')
  .get(controller.getOne)
  .post(controller.createOne)
  .put(controller.updateOne)
  .delete(controller.removeOne);

// '/many' routes
listRouter.route('/many')
  .get(controller.getMany);

module.exports = listRouter;
const itemRouter = require('express').Router();
const controller = require('./controller.js');

// '/one' routes
itemRouter.route('/one/:id')
  .get(controller.getOne) // need item id
  .post(controller.createOne) // need list id from req.list
  .put(controller.updateOne)
  .delete(controller.removeOne);

// '/many' routes
itemRouter.route('/many/:id')
  .get(controller.getMany); // need list id

module.exports = itemRouter;

// const mongoose = require('mongoose');
// const Promise = require('bluebird');
// Promise.promisifyAll(mongoose);

// GOOD
const getOne = model => (req, res) => {
  console.log(req.params);
  return model.findOne({ _id: req.params.id }).lean().exec()
    .then(doc => res.send(doc))
    .catch(err => {
      console.log('error at crud.js getOne', err);
      res.send(400);
    });
};

// GOOD
// getMany lists: need no id
// getMany items: need list id
const getMany = model => (req, res) => {
  if (req.params.id === 'all') {
    return model.find({}).lean().exec()
      .then(docs => res.send(docs))
      .catch(err => {
        console.log('error at crud.js getMany', err);
        res.send(400);
      });
  } else {
    return model.find({list: req.params.id}).lean().exec()
      .then(docs => res.send(docs))
      .catch(err => {
        console.log('error at crud.js getMany', err);
        res.send(400);
      });
  }
};


// GOOD
const createOne = model => (req, res) => {
  return model.create(req.body)
    .then(doc => res.send(doc))
    .catch(err => {
      console.log('error at crud.js createOne', err);
      res.send(400);
    });
};

// GOOD
const updateOne = model => (req, res) => {
  return model.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true } ).lean().exec()
    .then(updatedDoc => res.send(updatedDoc))
    .catch(err => {
      console.log('error at crud.js', err);
      res.send(400);
    });
};

// WORKING
const removeOne = model => (req, res) => {
  return model.findOneAndRemove({ _id: req.params.id })
    .then(removed => res.send(removed))
    .catch(err => {
      console.log('error at crud.js removeOne', err);
      res.send(400);
    });
};

const crudControllers = model => ({
  getOne: getOne(model),
  getMany: getMany(model),
  createOne: createOne(model),
  updateOne: updateOne(model),
  removeOne: removeOne(model)
});

module.exports = crudControllers;
// getOne; // GET /:id
// getMany; // GET /
// createOne; // POST /
// updateOne; // PUT /:id
// removeOne; // DELETE /:id

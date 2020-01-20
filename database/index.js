const mongoose = require('mongoose');
require('../server/item/model.js');
require('../server/list/model.js');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/todo', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log('connected to mongodb!');
});


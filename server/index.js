const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const item = require('./item/router.js');
const list = require('./list/router.js');
const port = 4321;


app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/item', item);
app.use('/list', list);


app.use(express.static(__dirname + '/../client/dist'));
app.listen(port, () => console.log(`Listening on port ${port}`));
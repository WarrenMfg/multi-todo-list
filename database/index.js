const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/todo', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log('connected to mongodb!');
});





// ITEM SCHEMA && MODEL
const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'complete', 'pastdue'],
      default: 'active'
    },
    notes: String,
    due: Date,
    list: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'list',
      required: true
    }
  },
  { timestamps: true }
);

itemSchema.index({list: 1, name: 1}, {unique: true}); // 1 means sort order (as opposed to -1); this line means within every list, the name field must be unique (only within that list); if 'unique': true was added to the name field in the schema, then all names in the entire db would have to be unique--this wouldn't be good for an app with many users!

const Item = mongoose.model('Item', itemSchema);




// LIST SCHEMA && MODEL
const listSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    description: String
  },
  { timestamps: true }
);

listSchema.index({ user: 1, name: 1 }, { unique: true });

const List = mongoose.model('List', listSchema);





module.exports.Item = Item;
module.exports.List = List;
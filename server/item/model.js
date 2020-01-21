const mongoose = require('mongoose');

// ITEM SCHEMA && MODEL
const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
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

module.exports = Item;
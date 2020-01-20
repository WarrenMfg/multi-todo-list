const mongoose = require('mongoose');

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

module.exports = List;
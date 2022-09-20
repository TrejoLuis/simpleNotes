const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: {
    type: String,
    default: '-'
  },
  content: {
    type: String,
    default: '-'
  },
  isPinned: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
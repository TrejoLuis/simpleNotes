const Note = require('../models/noteModel');

//@ route GET /api/notes
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ 'message': error.message });
  }
}

//@ route POST /api/notes
const createNewNote = async (req, res) => {
  if (!req.body.title && !req.body.content) {
    return res.status(400).json({ message: 'title or content are required' });
  }
  try {
    const note = await Note.create({
      title: req.body.title,
      content: req.body.content
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//@ route PUT /api/notes/:id
const updateNote = async (req, res) => {
  const id = req.params.id;
  if (!req.body.title && !req.body.content) {
    return res.status(400).json({ message: 'title or content are required' });
  }
  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(204).json({ message: `Note ID ${id} not found.` });
    }

    await Note.findByIdAndUpdate(id, {
      title: req.body.title,
      content: req.body.content
    },
      { new: true }
    );
    res.status(200).json({ message: `Updated Note ${id}` });
  } catch (error) {
    res.status(500).json({ message: error.message });;
  }
}

//@ route DELETE /api/notes/:id
const deleteNote = async (req, res) => {
  const id = req.params.id;
  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(204).json({ message: `Note ID ${id} not found` });
    }

    await Note.deleteOne(note);
    res.status(200).json({ message: `Note ID ${id} deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote
};
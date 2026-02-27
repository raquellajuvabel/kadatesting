import { Router } from 'express';
import { Post } from '../models/index.js'; // Pastikan path ini benar

const router = Router();

// GET ALL NOTES
router.get('/', async (req, res, next) => {
  try {
    const notes = await Post.find(); // Mengambil semua data dari MongoDB
    res.json(notes);
  } catch (e) {
    next(e);
  }
});

// GET SINGLE NOTE BY ID
router.get('/:id', async (req, res, next) => {
  try {
    const note = await Post.findById(req.params.id); // MongoDB ID biasanya string (ObjectId)
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (e) {
    next(e);
  }
});

// CREATE NOTE
router.post('/', async (req, res, next) => {
  const { author,title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const note = await Post.create({ author,title, content });
    res.status(201).json(note);
  } catch (e) {
    next(e);
  }
});

// UPDATE NOTE
router.put('/:id', async (req, res, next) => {
  const { author, title, content } = req.body;

  try {
    // { new: true } agar mengembalikan data yang sudah diupdate
    const note = await Post.findByIdAndUpdate(
      req.params.id, 
      { author, title, content }, 
      { new: true }
    );
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (e) {
    next(e);
  }
});

// DELETE NOTE
router.delete('/:id', async (req, res, next) => {
  try {
    const note = await Post.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ result: 'success', message: 'Note deleted' });
  } catch (e) {
    next(e);
  }
});

export default router;
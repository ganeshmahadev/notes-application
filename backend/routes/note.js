const express = require('express');
const Note = require('../models/note');
const auth = require('../middleware/auth'); // Middleware for authentication

const router = express.Router();

// Create a note
router.post('/notes', auth, async (req, res) => {
    try {
        const note = new Note({
            ...req.body,
            author: req.user._id
        });
        await note.save();
        res.status(201).send(note);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all notes for the logged-in user
router.get('/notes', auth, async (req, res) => {
    try {
        const notes = await Note.find({ author: req.user._id });
        res.send(notes);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;

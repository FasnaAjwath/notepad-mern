const express = require('express')
const router = express.Router()
const Note = require('../models/Note')
const jwt = require('jsonwebtoken')

// middleware to check token
const protect = (req, res, next) => {
    const token = req.headers['authorization']

    if (!token) {
        return res.status(401).json({ message: 'No token, access denied' })
    }

    try {
        const decoded = jwt.verify(token.trim(), process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' })
    }
}

// Get all notes
router.get('/', protect, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
})

// Create a note
router.post('/', protect, async (req, res) => {
    try {
        const { title, content } = req.body
        const note = await Note.create({
            title,
            content,
            user: req.user.id
        })
        res.status(201).json(note)
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
})

// Update a note
router.put('/:id', protect, async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(note)
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
})

// Delete a note
router.delete('/:id', protect, async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Note deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
})

module.exports = router
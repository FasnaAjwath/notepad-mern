const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Sign Up
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body

        // check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' })
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // create new user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })

        res.status(201).json({ message: 'User registered successfully' })

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
})

// Sign In
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        // check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }

        // check password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }

        // create token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.status(200).json({ token, message: 'Login successful' })

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
})

module.exports = router
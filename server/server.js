require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const notesRoutes = require('./routes/notes')

const app = express()

app.use(express.json())

app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/notes', notesRoutes) 

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected!'))
.catch((err) => console.log('MongoDB connection error:', err))



app.get('/', (req, res) => {
    res.send('Server is running!')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
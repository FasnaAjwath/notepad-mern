require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./db')
const authRoutes = require('./routes/auth')
const notesRoutes = require('./routes/notes')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/notes', notesRoutes)

app.get('/', (req, res) => {
    res.send('Server is running!')
})

const PORT = process.env.PORT || 5000

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    })
})
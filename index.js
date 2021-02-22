const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const getData = require('./api')

app.get('/', async (req, res) => {
    const data = await getData()
    res.status(200).json(data)
})

app.listen(PORT, () => console.log(`Working on http://localhost:${PORT}`))
const express = require('express')
const path = require('path')
const app = express()
const axios = require('axios');
const api = require('./routes')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/', api)

const port = 3111 //because why not
app.listen(port, function () {
    console.log(`Server running on ${port}`)
})
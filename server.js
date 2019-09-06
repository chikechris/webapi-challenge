const express = require('express')
const projectRoutes = require('./routes/projRoutes.js')

const server = express()

server.use('/projects', projectRoutes)

server.use('/', (req, res) => {
  res.send('api home')
})

module.exports = server


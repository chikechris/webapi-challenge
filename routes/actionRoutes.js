const express = require('express')
const dbProject = require('../data/helpers/actionModel.js')
const dbAction = require('../data/helpers/actionModel.js')



const router = express.Router()

router.use(express.json())

router.get('/', (req, res) => {
  dbAction
    .get()
    .then(results => {
      res.status(200).json(results)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

router.get('/:id', (req, res) => {
  dbAction
    .get(req.params.id)
    .then(results => {
      res.status(200).json(results)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})


module.exports = router


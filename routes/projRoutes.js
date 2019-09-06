const express = require('express')
const dbProject = require('../data/helpers/actionModel.js')
const dbAction = require('../data/helpers/actionModel.js')


const router = express.Router()

router.use(express.json())

router.get('/', (req, res) => {
  dbProject.get()
    .then(results => {
      res.status(200).json(results)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

router.get('/:id', (req, res) => {
  dbProject.get(req.params.id)
    .then(results => {
      res.status(200).json(results)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

router.post('/', validateProjectPost, (req, res) => {
  dbProject
    .insert(req.body)
    .then(results => {
      res.status(200).json(results)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

router.put('/:id', validateProjectId, validateProjectPost, (req, res) => {
  dbProject
    .update(req.params.id, req.body)
    .then(results => {
      res.status(201).json(results)
    })
    .catch(error => {
      res.status(500).json(error)
    })
}) 

router.delete('/:id', validateProjectId, (req, res) => {
  dbProject
    .remove(req.params.id)
    .then(results => {
      res.status(201).json(results)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})


// middleware:
function validateId (req, res, next) {
  dbAction.get(req.params.id).then(results => {
    if (typeof results === 'object') {
      console.log(`${req.params.id} is an object`)
      next()
    } else {
      res.status(400).json({ message: 'invalid project id' })
    }
  })
}

function validateProjectId (req, res, next) {
  dbAction.get(req.params.id).then(results => {
    if (results === null) {
      res.status(400).json({ message: 'invalid project id' })
    } else {
      next()
    }
  })
}

function validateProjectPost (req, res, next) {
  if (req.body.name && req.body.description) {
    next()
  } else {
    res
      .status(400)
      .json({ message: 'missing required description or name field' })
  }
}

function validatePost (req, res, next) {
  if (req.body.notes && req.body.description) {
    console.log(`Description Length ${req.body.description.length}`)
    if (req.body.description.length <= 126) {
      next()
    } else {
      res
        .status(400)
        .json({
          message: 'description field needs to be less than 126 characters'
        })
    }
  } else {
    res
      .status(400)
      .json({ message: 'missing required description or notes field' })
  }
}



module.exports = router


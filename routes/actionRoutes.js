const express = require('express')
const dbProject = require('../data/helpers/projectModel.js')
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

router.get('/:id', validateId, (req, res) => {
  dbAction
    .get(req.params.id)
    .then(results => {
      res.status(200).json(results)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

router.post('/', validateProjectId, validatePost, (req, res) => {
  dbAction
    .insert(req.body)
    .then(results => {
      res.status(200).json(results)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

router.delete('/:id', validateId, (req, res) => {
  dbAction
    .remove(req.params.id)
    .then(results => {
      res.status(201).json(results)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

router.put('/:id', validateId, validatePut, (req, res) => {
  dbAction
    .update(req.params.id, req.body)
    .then(results => {
      res.status(201).json(results)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

// middleware
function validatePut (req, res, next) {
  if (req.body.notes && req.body.description) {
    console.log(`Length of the description ${req.body.description.length}`)
    if (req.body.description.length <= 128) {
      next()
    } else {
      res
        .status(400)
        .json({
          message: 'description field needs to be less than 128 characters'
        })
    }
  } else {
    res
      .status(400)
      .json({ message: 'missing required description or notes field' })
  }
}

function validatePost (req, res, next) {
  if (req.body.notes && req.body.description && req.body.project_id) {
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
      .json({
        message: 'missing required description, notes, or project id field'
      })
  }
}

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
  dbProject.get(req.body.project_id).then(results => {
    if (results === null) {
      res.status(400).json({ message: 'invalid project id' })
    } else {
      next()
    }
  })
}




module.exports = router


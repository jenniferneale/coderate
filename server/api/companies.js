const router = require('express').Router()
const {Company} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Company.findAll()
    .then(companies => res.json(companies))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
    Company.findById(req.params.id)
      .then(comp => res.json(comp))
      .catch(next);
  })

router.post('/', (req, res, next) => {
    const info = req.body;
    Company.create(info,
        {
            include: [{ all: true }]
        }).then(comp => res.json(comp))
    .catch(next)
})

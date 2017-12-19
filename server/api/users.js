const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields, not private fields
    attributes: ['id', 'email', 'isAdmin']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id, {
    attributes: ['id', 'email', 'communication_score', 'coding_score', 'title', 'companyId', 'isAdmin'],
    include: [{ all: true }]
  })
  .then(user => res.json(user))
  .catch(next);
})

router.post('/', (req, res, next) => {
  const info = req.body;
  User.create(info).then(user => res.json(user))
    .catch(next);
})
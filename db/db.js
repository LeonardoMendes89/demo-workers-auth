const db    = require('../knexfile')['production']
const knex  = require('knex')(db)

module.exports = knex
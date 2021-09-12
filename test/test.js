const dev   = process.env.NODE_ENV      ||'development' 
const prod  = process.env.DATABASE_URL  ||'production' 
const db    = require('../knexfile')['production']
const knex  = require('knex')(db)

const express    = require('express')
const testRouter = express()

testRouter.route('/').get(async(req,res)=>{
    await knex.select('*').table('auth')
                          .then(account => res.status(200).json(account))
                          .catch(err    => res.status(500).json(err))
}).post(async(req,res)=>{

})

module.exports = testRouter 
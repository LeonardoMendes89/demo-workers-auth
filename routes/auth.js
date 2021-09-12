const knex = require('../db/db')

const express    = require('express')
const authRouter = express()

authRouter.route('/').post(async(req,res)=>{
 
        userlogin = req.body
        passlogin = req.body
  

   await knex.select(['id','userlogin'])
                .where({userlogin, passlogin })  
                .table('auth')
                .then(account => res.status(200).json(account))
                .catch(err => res.status(500).json(err))
})

module.exports = authRouter 
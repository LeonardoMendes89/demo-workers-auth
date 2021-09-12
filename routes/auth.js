const knex = require('../db/db')

const express    = require('express')
const authRouter = express()

authRouter.route('/').post(async(req,res)=>{
    
    let data = {
        userlogin: req.body.userlogin,
        passlogin: req.body.passlogin
    }
  

   await knex.select(['id','userlogin'])
                .where(data)  
                .table('auth')
                .then(account => res.status(200).json(account))
                .catch(err => res.status(500).json(err))
})

module.exports = authRouter 
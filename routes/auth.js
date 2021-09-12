const knex = require('../db/db')

const express    = require('express')
const authRouter = express()

authRouter.route('/').post(async(req,res)=>{
    
        let data = {
            userlogin : req.body.userlogin,
            passlogin : req.body.passlogin
        }
  
  

   await knex.select(['id','userlogin','passlogin'])
                .where(data)  
                .table('auth')
                .then(data=>res.status(200).json(data))
                .catch(err => res.status(500).json(err))
})

module.exports = authRouter 
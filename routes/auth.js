const knex = require('../db/db')

const express    = require('express')
const authRouter = express()

authRouter.route('/').post(async(req,res)=>{

        /** logic  of  auth here! */
        
})

module.exports = authRouter 
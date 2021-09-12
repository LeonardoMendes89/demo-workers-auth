const db    = require('../knexfile')['production']
const knex  = require('knex')(db)

const express    = require('express')
const testRouter = express()

testRouter.route('/').get(async(req,res)=>{
    await knex.select('*').table('auth')
                          .then(account => res.status(200).json(account))
                          .catch(err    => res.status(500).json(err))
}).post(async(req,res)=>{
  
  try{

      await knex.select([ 'id','userlogin','passlogin'   ])
                .where({   userlogin: req.body.userlogin })
                .onWhere({ passlogin: req.body.passlogin }) 
                .table('auth')
                .then(_=>res.status(200).json({
                    msg:'usuário logado com sucesso!'
                }))
                .catch(_ => res.status(401).json({
                    msg:'usuário não encontrado!'
                }))

  }catch(err){
        return res.status(500).json(err)
  }

})

module.exports = testRouter 
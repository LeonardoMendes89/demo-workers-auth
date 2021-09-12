const db    = require('../knexfile')['production']
const knex  = require('knex')(db)

const express    = require('express')
const testRouter = express()

testRouter.route('/').get(async(req,res)=>{

    await knex.select('*').table('auth')
                          .then(account => res.status(200).json(account))
                          .catch(err    => res.status(500).json(err))

}).post(async(req,res)=>{

      await knex.select([ 'id','userlogin','passlogin'   ])
                .where({   userlogin: req.body.userlogin })
                .onWhere({ passlogin: req.body.passlogin }) 
                .table('auth')
                .then(_=>res.status(200).json({
                    msg:'usuário encontrado com sucesso!'
                }))
                .catch(err=> res.status(500).json(err))

})


testRouter.route('/where').get(async(req,res)=>{

    userlogin = 'admin@aws.com'
    passlogin =  '81dc9bdb52d04dc20036dbd8313ed055'

    let found =   await knex.where( userlogin )
                            .select([ 'id','userlogin' ])
                            .table('auth')
                            .then(data =>{
                                return data
                            })
                            .catch(err=> res.status(500).json(err))

    if(found){
        return res.status(200).json({
            msg:'usuário encontrado com sucesso!'
        })
    }else if(!found){
        return res.status(500).json({
            msg:'usuário não encontrado!'
        })
    }
                      
})

module.exports = testRouter 
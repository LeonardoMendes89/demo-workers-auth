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

    userlogin =  'nodedev@gmail.com'
    passlogin =  '827ccb0eea8a706c4c34a16891f84e7b'

    await knex.select('*')
                        .where('userlogin',userlogin)
                        .andWhere('passlogin', passlogin)
                        .table('auth')
                        .then(account => res.status(200).json(account))
                        .catch(err    => res.status(500).json(err))
        
}).post(async(req,res)=>{

   try{

        /** OK!*/
        const { userlogin , passlogin} = req.body
        /** OK!*/
        if(!userlogin || !passlogin){
            return res.status(400).json({Erro:'Os campos devem ser diferentes de vazio!'})
        }

        const user = await knex('auth').where('userlogin', userlogin)
                                       .select(['id','userlogin','passlogin'])
                                    
        
        const pass = await knex('auth').where('passlogin', passlogin)
                                       .select(['id','userlogin','passlogin'])
        
        if(!user || !pass)  return res.status(401).json({Erro: 'Usuário não autorizado!'})

        if(user && pass)  return res.status(200).json({msg: 'Usuário autenticado com sucesso!'})


   }catch(err){
        return res.status(500).json(err)
   }

})

module.exports = testRouter 


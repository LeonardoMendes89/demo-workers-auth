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

   //const { userlogin, passlogin } = req.body

        return await knex('auth').where(function(){
                                const { userlogin , passlogin} = req.body

                                if(     userlogin != '' || userlogin != null
                                    &&
                                        passlogin != '' || passlogin  != null
                                )
                                    {
                                            this.where('userlogin', userlogin)
                                                .andWhere('passlogin', passlogin)
                                    }
                                else{
                                    res.status(400).json({msg:'Os campos devem ser diferentes de vazio!'})
                                }
                         })
                         .then(e    => {
                             e.filter(e=>{
                                return res.status(200).json(e)
                             })
                         })
                         .catch(_ => res.status(500).json({
                             msg:'Erro: desculpe hove um err no servidor!'
                         }))
  

})

module.exports = testRouter 


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

    /** metodo 1 (falhou)   */

   /*       
   
   try{
  
   
        const { userlogin , passlogin} = req.body
       
        if(!userlogin || !passlogin){
            return res.status(400).json({Erro:'Os campos devem ser diferentes de vazio!'})
        }

        const user = await knex('auth').where('userlogin', userlogin)
        
        const pass = await knex('auth').where('passlogin', passlogin)
        
        if( !user || !pass )                    return res.status(401).json({Erro: 'Usuário não autorizado!'})

        if( user === '' || pass  === '')        return res.status(401).json({Erro: 'Usuário não autorizado!'})

        if( user === null || pass  === null)    return res.status(401).json({Erro: 'Usuário não autorizado!'})

        if( user === [] || pass  === [])        return res.status(401).json({Erro: 'Usuário não autorizado!'})

        if( user === {} || pass  === {})        return res.status(401).json({Erro: 'Usuário não autorizado!'})

        if( user && pass )   return res.status(200).json({msg: 'Usuário autenticado com sucesso!'})


   }catch(err){
        return res.status(500).json(err)
   }*/
   //pergunta publicada no link:  https://www.udemy.com/course/curso-web/learn/lecture/11978558#questions


   
   
   
   
   /** metodo 2 (falhou) */

    /*
    const { userlogin , passlogin} = req.body
       
    if(!userlogin || !passlogin){
        return res.status(400).json({Erro:'Os campos devem ser diferentes de vazio!'})
    }

    let account = await knex('auth').where({
        userlogin: userlogin,
        passlogin: passlogin
    }).select(function(e){
        res.json(e)
    })

    if(!account) return res.status(401).json({Erro: 'Usuário não autorizado!'    })
    else return res.status(200).json({Msg:  'Usuário logado com sucesso!'})
    */




    /** metodo 3 (falhou) */

    /*const { userlogin , passlogin} = req.body
       
    if(!userlogin || !passlogin){
        return res.status(400).json({Erro:'Os campos devem ser diferentes de vazio!'})
    }

    let account = await knex('auth').where(function(){
        this.where({userlogin: req.body.userlogin}, 'userlogin')
            .andWhere({passlogin: req.body.passlogin}, 'passlogin')
    })
       
    if(account)  return res.status(200).json({Msg:'Usuário logado com sucesso!'})
    if(!account) return res.status(404).json([])*/


    /** metodo 4 (sucesso) */

    /*const { userlogin , passlogin} = req.body
       
    if(!userlogin || !passlogin){
        return res.status(400).json({Erro:'Os campos devem ser diferentes de vazio!'})
    }

    let user = await knex('auth')
                            .where({ userlogin: req.body.userlogin })
                            .first()
   
    if(!user) return res.status(404).json({Msg:  'Usuário não encontrado!'})
    if(user ) return res.status(200).json({Msg:  'Usuário encontrado!'    })*/







     /** metodo 5 (sucesso) */

    /*const { userlogin , passlogin} = req.body
       
    if(!userlogin || !passlogin){
        return res.status(400).json({Erro:'Os campos devem ser diferentes de vazio!'})
    }

    let pass = await knex('auth')
                            .where({ passlogin: req.body.passlogin })
                            .first()

    if(!pass) return res.status(404).json({Msg:  'senha não encontrada!'})
    if(pass ) return res.status(200).json({Msg:  'senha encontrada!'    })*/






    /** metodo 6 (sucesso) */
    const { userlogin , passlogin} = req.body
       
    if(!userlogin || !passlogin){
        return res.status(400).json({Erro:'Os campos devem ser diferentes de vazio!'})
    }

    let user = await knex('auth')
                            .where({ userlogin: req.body.userlogin })
                            .first()

    if(!user) return res.status(404).json({Msg:  'Usuário não encontrado!'})

    let pass = await knex('auth')
                            .where({ passlogin: req.body.passlogin })
                            .first()

    if(!pass) return res.status(401).json({Msg:  'Usuário não autorizado!'})
    
    if(user && pass) return res.status(200).json({Msg:  'Usuário logado com sucesso!'    })

})

module.exports = testRouter 


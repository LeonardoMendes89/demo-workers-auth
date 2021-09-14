const knex = require('../db/db')

const express    = require('express')
const authRouter = express()

authRouter.route('/').post(async(req,res)=>{

    const { userlogin , passlogin} = req.body
       
    if(!userlogin || !passlogin){
        return res.status(400).json({Error:" The field value can't! be empty"})
    }

    let user = await knex('auth')
                            .where({ userlogin: req.body.userlogin })
                            .first()

    if(!user) return res.status(404).json({Msg:  'User not found!'})

    let pass = await knex('auth')
                            .where({ passlogin: req.body.passlogin })
                            .first()

    if(!pass) return res.status(401).json({Msg:  'User unauthorized!'})
    
    if(user && pass) return res.redirect('https://workers-app.netlify.app/home')
     
	//if(user && pass) return res.status(200).json({msg:'OK'})
})

module.exports = authRouter 
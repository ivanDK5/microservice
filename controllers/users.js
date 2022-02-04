const db =require('../config/store')
const {MongoClient} = require('mongodb');
const passport= require('passport');
const {toAuthJSON,createPassword}=require('../helpers/auth')

function create(req,res,next){
  const body=req.body, password=body.pass;
  delete body.pass;
  let user=createPassword(body,password);
  db.get().db(process.env.DB_NAME).collection(process.env.COLLECTION).insertOne(user)
    .then(user=>res.status(200).send(toAuthJSON(user)))
    .catch(next) 
}

function login(req,res,next){
  if(!req.body.user || !req.body.pass){
    return res.status(422).json({error:{user:'falta informacion'}})
  }
   passport.authenticate('local',
  {session:false },
  function(err,user,info){
    if(err){return next(err)}
    if(user){
      user.token=generaJWT(user);
      const {username,token}=user;
      return res.status(200).json({username:username,token:token})
    }else{
      return res.status(422).json(info);
    }
  })(req,res,next);
}

async function read(req,res,next){
  let result
  let items = [];
 
  if(req.params.id){
      db.get().db(process.env.DB_NAME).collection(process.env.COLLECTION).findOne({user:req.params.id})
      .then(user=>res.send(user))
      .catch(next)
  }else{
    result=db.get().db(process.env.DB_NAME).collection(process.env.COLLECTION).find({})
    if(result){
      await result.forEach((user)=>{
        items.push(user);
      });
      res.send(items);
    }
  }
  
}

async function update(req,res,next){
  db.get().db(process.env.DB_NAME).collection(process.env.COLLECTION).updateOne({user:req.params.id},{$set:req.body})
  .then(user=> res.status(200).send({status:200,msj:"user modified succesfully"}))
  .catch(next)
  
}

async function remove(req,res,next){
  db.get().db(process.env.DB_NAME).collection(process.env.COLLECTION).deleteOne({user:req.params.id})
  .then(user=> res.status(200).send({status:200,msj:"user remove succesfully"}))
  .catch(next)
}

module.exports={
  create,
  read,
  update,
  remove,
  login
}
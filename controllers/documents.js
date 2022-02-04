const db =require('../config/store')
const {MongoClient} = require('mongodb');

function create(req,res,next){
  db.get().db(process.env.DB_NAME).collection(process.env.COLLECTION).insertOne(req.body)
     .then(document=> res.status(200).send(document))
     .catch(next) 
}

async function read(req,res,next){
  let result
  let items = [];
 
  if(req.params.id){
      db.get().db(process.env.DB_NAME).collection(process.env.COLLECTION).findOne({titulo:req.params.id})
      .then(document=>res.send(document))
      .catch(next)
  }else{
    result=db.get().db(process.env.DB_NAME).collection(process.env.COLLECTION).find({})
    if(result){
      await result.forEach((document)=>{
        items.push(document);
      });
      res.send(items);
    }
  }
  
}

async function update(req,res,next){
  db.get().db(process.env.DB_NAME).collection(process.env.COLLECTION).updateOne({titulo:req.params.id},{$set:req.body})
  .then(document=> res.status(200).send({status:200,msj:"document modified succesfully"}))
  .catch(next)
  
}

async function remove(req,res,next){
  db.get().db(process.env.DB_NAME).collection(process.env.COLLECTION).deleteOne({titulo:req.params.id})
  .then(document=> res.status(200).send({status:200,msj:"document remove succesfully"}))
  .catch(next)
}

module.exports={
  create,
  read,
  update,
  remove
}
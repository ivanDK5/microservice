const Document=require('../models/document')
module.exports=(req,res,next)=>{
  const errors = User.validate(req.body)
  if(errors&&errors.length!=0){
    let error=[]
    console.log(errors)
    errors.forEach(err => {
      error.push({path:err.path,msj:err.message})
    })
    res.status(400).send(error);
  }else{
    next()
  }
}
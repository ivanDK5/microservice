
const crypto =require('crypto')
const jwt =require('jsonwebtoken')

let createPassword= function(user,password){
  let salt =crypto.randomBytes(16).toString('hex');
  let hash =crypto.pbkdf2Sync(password,salt,10000,512,'sha512')
  .toString('hex');
  return {...user,salt,hash} 
}

let validatePassword = function (hash,password){
  const newHash =crypto.pbkdf2Sync(password,this.salt,10000,512,'sha512').
  toString('hex');
  return hash===newHash;
}


let generaJWT = function(user){
  const today=new Date();
  const exp =new Date(today);
  exp.setDate(today.getDate()+60);
  return jwt.sign({
    id: user._id,
    username:user.user,
    exp:parseInt(exp.getTime()/1000)
  },process.env.SECRET)


}

let toAuthJSON =function(user){
  return {
    username:user.user,
    user:user.insertedId,
    token:generaJWT(user)
  }
}

module.exports={
  validatePassword,
  createPassword,
  generaJWT,
  toAuthJSON 
}
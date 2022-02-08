const passport = require('passport');
const localStrategy= require('passport-local').Strategy;
const {validatePassword}=require('../helpers/auth')
const db =require('../config/store')

passport.use(new localStrategy({
  usernameField:'user',
  passwordField:'pass'
},function (user,password,next){
  db.get().db(process.env.DB_NAME).collection(process.env.COLLECTION).findOne({user:user})
  .then(function(user){
    if(!user||!validatePassword(user.hash,user.salt,password)){
    return next(null,false,{errors:{'credentials':'las crendenciales son incorrectas'}});
  }
  return next(null,user);
})
  .catch(next)
}));
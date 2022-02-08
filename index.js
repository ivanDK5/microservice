const express = require('express');
const app = express();
const db = require('./config/store');
var bodyParser = require('body-parser');
require('./config/passport')
if(process.env.NODE_ENV!=='production'){
  require('dotenv').config();
}

  db.connect()
      .then(() =>{console.log('database connected')})
      .catch((e) => {
          console.error(e);
          // Always hard exit on a database connection error
          process.exit(1);
      });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/v1/',require('./routes'));
app.get('/',(req,res)=>{
  res.send('welcome to service')
})

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
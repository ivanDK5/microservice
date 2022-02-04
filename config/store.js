const {MongoClient} = require('mongodb');
let connection=null; 

let connect = () => new Promise((resolve, reject) => {
  MongoClient.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
      if (err) { reject(err); return; };
      resolve(db);
      connection = db;
  });
});
/* 
let connect = () => MongoClient.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
 */
let get= () => {
  if(!connection) {
      throw new Error('Call connect first!');
  }
  return connection;
}

/* 
function connection(callback){
  let connect
   MongoClient.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true },callback())
   
}
 */
module.exports={
  connect,
  get
}

/* 
(err, client) => {
  if (err) return console.error(err)
  connect=client.db('power').collection(collection)
  console.log('Connected to Database')
  console.log(typeof client.db('power').collection(collection) )
   console.log(typeof connect)
   
   
} */
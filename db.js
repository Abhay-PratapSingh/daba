const mongoose = require('mongoose');


//Define the MonogoDB connection URL
const mongoURL ='mongodb://localhost:27017/';


//Set up MonogoDB  connection

mongoose.connect(mongoURL)

//mongoose maintain a default  connection   object  representing  the MongoDB connection
const db =mongoose.connection;



//Define event  listener  for database connection



db.on('connected',()=>{
  console.log("connected to mongo db server !!");  
})


db.on('error',()=>{
  console.log("MongoDB  connetion error !!");  
})

db.on('disconnected',()=>{
  console.log("MongoDB  disconnected error !!");  
})

//export the database connection
module.exports =db
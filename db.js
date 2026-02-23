require('dotenv').config();

const mongoose = require('mongoose');


require('dotenv').config();
//Define the MonogoDB connection URL
// const mongoURL = process.env.MONODB_URL_LOCAL   ;                         
const mongoURL = process.env.DB_URL;

//Set up MonogoDB  connection

mongoose.connect(mongoURL)

//mongoose maintain a default  connection   object  representing  the MongoDB connection
const db =mongoose.connection;




//Define event  listener  for database connection



db.on('connected',()=>{
  console.log("connected to mongo db server !!");  
})


db.on('error',(err)=>{
  console.log("MongoDB  connetion error !!",err);  
})

db.on('disconnected',()=>{
  console.log("MongoDB  disconnected error !!");  
})

//export the database connection
module.exports =db
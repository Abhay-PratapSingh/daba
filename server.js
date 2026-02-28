require('dotenv').config();
const express =require('express')
const app = express()
const db =require('./db');
const passport =require('passport');
const  LocalStrategy =require('passport-local').Strategy;
const Person = require('./models/Person');




const bodyParser=require('body-parser');
app.use(bodyParser.json());//request.body

const PORT = process.env.PORT  ||  3000;


//middleware  defination


const logRequest = (req, res, next) => {
  console.log(`${new Date().toLocaleString()} Request made to: ${req.originalUrl}`);
  next();//move on to next phase
};

app.use(logRequest);

passport.use(new LocalStrategy (async(USERNAME,password,done)=>{

     console.log("USERNAME:", USERNAME);
    console.log("PASSWORD:", password);
//authentication logic here
try{

console.log('Receiverd credenticals',USERNAME,password);

const user = await Person.findOne({username:USERNAME});
if(!user)
  return done(null,false,{message:'Incorrect Username'});

const isPasswordMatch= user.password === password ? true :false;

if(isPasswordMatch){
  return done(null,user);
}
else {

 return  done(null,false,{message : 'Incorrect  Password'});
  
}
}catch(err){


  return done(err);

}

}));

app.use(passport.initialize())

const localauthMiddleware =passport.authenticate('local',{session:false})
//welcome API of dabha  , we need to work with u
app.get('/',localauthMiddleware,function(req,res){

 res.send("welcome to my hotel.... How i can help you  ?, we have  list of  dishes ");

})






//Import the route files

// const personRoutes =require('./routes/personRoutes');
// const menuRoutes =require('./Routes/MenuRoutes');

const menuRoutes = require('./routes/MenuRoutes');
const personRoutes = require('./routes/personRoutes');



//use the routes
app.use('/person',localauthMiddleware, personRoutes);
app.use('/menu', menuRoutes);














  app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000');
})
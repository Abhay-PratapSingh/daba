require('dotenv').config();
const express =require('express')
const app = express()
const db =require('./db');



const bodyParser=require('body-parser');
app.use(bodyParser.json());//request.body

const PORT = process.env.PORT  ||  3000;


//middleware  defination


const logRequest = (req, res, next) => {
  console.log(`${new Date().toLocaleString()} Request made to: ${req.originalUrl}`);
  next();
};






//welcome API of dabha  , we need to work with u
app.get('/', logRequest,function(req,res){

 res.send("welcome to my hotel.... How i can help you  ?, we have  list of  dishes ");

})






//Import the route files

// const personRoutes =require('./routes/personRoutes');
// const menuRoutes =require('./Routes/MenuRoutes');

const menuRoutes = require('./routes/MenuRoutes');
const personRoutes = require('./routes/personRoutes');



//use the routes
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);














  app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3000');
})
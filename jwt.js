const  jwt = require('jsonwebtoken');

const jwtAuthMiddleWare=(req,res,next)=>{

//extract the jwt token from the request headers

const  token = req.headers.authorization.split(" ")[1];

if(!token)  return  res.status(401).json({error :"UNauthorized"});

 try{

//verify  the JWT token

 const decoded = jwt.verify(token, process.env.JWT_SECRET);

 //attach user information  to  request object 

 req.user= decoded
 next();
} catch(err){

    console.error(err);
    res.status(401).json({error : 'Invaild token'});

}


}



//Function to generate Token

const generateToken = (userData) =>{

    //generate  a new JWT token using user data
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:60});

}






module.exports ={jwtAuthMiddleWare,generateToken}
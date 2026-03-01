const express = require('express');
const router =express.Router();
const Person =require('../models/Person');
const {jwtAuthMiddleWare,generateToken}=require('../jwt')


//POST route  to add a person

router.post('/signup',async(req,res)=>{
try{
const data =req.body;//assuming the request body  contains the person data
//create the new Person document  using  the Mongoose model
const newPerson =new Person(data)
//Save  the new Person to the database 
const response = await newPerson.save();
console.log(' !!data saved !!');

const payload ={

id: response.id,
username :response.username

}


const  token = generateToken(payload);
console.log("Token is  ::", token);


  res.status(200).json({response:response ,token: token});
}
catch(err){
console.log(err);
res.status(500).json({error:' !!Internal Server Error !!'});

}


})



router.get('/',async(req,res)=>{

  try{

    const data= await Person.find();
    console.log("data fetched successfully Bro !!!!!");
    res.status(200).json(data);


  }catch(error){


    console.log(error);
res.status(500).json({error:' !!Internal Server Error !!'});



  }


})




router.get('/:workType',async(req,res)=>{



try{
    

const  workType = req.params.workType;


if(workType == 'chef' ||  workType =='manager' ||  workType == 'waiter'   ){

  const response = await Person.find({work:workType});

  console.log("response fetched");
  res.status(200).json(response);
}else{

  res.status(400).json({error: "Invalid Server Error"});
}
}catch(err){

  console.log(err);
  res.status(500).json({error : 'Internal Server Error'});

}

})




router.put('/:id',async(req,res)=>{


    try{

const personId= req.params.id;//extract the id from the URL Parameter
const  updatedPersonData = req.body;//updated data for the person

const response =await Person.findByIdAndUpdate(personId, updatedPersonData,{

new :true,//Return  the updated Document

runValidators :true,//Run Mongoose validation



})

if(!response){


    return res.status(404).json({error: 'Person not found'});
}
console.log("data Updated !!");
res.status(200).json(response);


    }catch(err){

console.log(err);
  res.status(500).json({error : 'Internal Server Error'});


    }



})


router.delete('/:id',async(req,res)=>{


    try{

const personId= req.params.id;//Extract the  person's ID from the URl parameter 


//Assuming  you  have  a Person   model
const  response   =await Person.findByIdAndDelete(personId);
if(!response){

return res.status(404).json({error: 'Person not found '})

}

console.log("data deleted ");
res.status(200).json({message :  'person Deleted  Successfully '})

}catch(err){


console.log(err);
  res.status(500).json({error : 'Internal Server Error'});



}




})


//login route

router.post('/login',async(req,res)=>{

try{

//Extract Username  and Password  from request  body

const {username,password}=req.body;


//find  the user by user username

const  user =  await Person.findOne({username :username});

//if user does not exist or password does not match , return  error

if(!user || !(await user.comparePassword(password)  )){

  return res.status(401).json({error : 'invalid  username or password '});

}



const payload  ={

id : user.id,
username:user.username

}

const  token = generateToken(payload)

//return token as response 

res.json({token});



}catch(err){

  console.error(err);
  res.status(500).json({error : ' Internal Server Error '});
  


}

})



















module.exports = router;
const express = require('express');
const router =express.Router();
const Menu= require('../models/Menu')


router.get('/',async(req,res)=>{

  try{

    const data= await Menu.find();
    console.log("data fetched successfully Bro !!!!!");
    res.status(200).json(data);


  }catch(error){


    console.log(error);
res.status(500).json({error:' !!Internal Server Error !!'});



  }


})


router.post('/', async(req,res)=>{

try{

const  data =  req.body;
const newMenu= new Menu(data);
const  response = await newMenu.save();
console.log("!!data Saved  !!");
res.status(200).json(response);
}catch(err){

console.log(err);
res.status(500).json({error:"!! Internal Server Errors"})
}


})







router.get('/:category',async(req,res)=>{

try{
    
const  categories = req.params.category;

if(categories== 'veg' ||  categories =='non-veg' || categories =='dessert' || categories =='drink'   ){

  const response = await Menu.find({category:categories});

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















module.exports = router;
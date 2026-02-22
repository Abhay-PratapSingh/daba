const mongoose = require("mongoose");
//Define a menu iteams Schema 
const menuSchema= new mongoose.Schema(
    
    
    {


 name: {
  type: String,
  required: true,
  trim: true
},

category:{

    type :String,
     enum: ['veg', 'non-veg', 'drink', 'dessert'],
    required: true



},

price:{
type:Number,
required:true

}

},

{timestamps: true }

);




//Create Menu model

const Menu= mongoose.model('Menu',menuSchema);
module.exports= Menu;
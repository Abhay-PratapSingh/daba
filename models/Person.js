const mongoose =require('mongoose');
//Define the Person Schema
const personSchema = new mongoose.Schema({

    name :{

        type :String,
        required:true,
          trim: true


    },

    age :{

        type :Number
    },

    work:{

        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile :{

        type:String,
        required :true
    },

    email:{

        type :String,
        required:true,
        unique:true
    },
    salary:{

        type:Number,
        required:true
    },

    username :{

  required:true,
  type:String,
   trim: true
    },

    password:{

required:true,
type:String,
minlength: 6
},


})

//create Person Model

const Person = mongoose.model('Person',personSchema);
module.exports=Person;


  
const mongoose =require('mongoose');

const bcrypt =require('bcrypt');
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

personSchema.pre('save', async function(next){

    const person =this;
  /// hash the passowrd only if it has bees modified   (or is new )
    if(!person.isModified('password')) return next();
    try{







// hash password generation 
        const salt =await bcrypt.genSalt(10);

        //hash password

        const hashedPassword  =await bcrypt.hash(person.password,salt);
        person.password=hashedPassword;

next();

    }
    catch(err){

return  next(err);

    }
})


personSchema.methods.comparePassword=async function (candidatePassword){

try{

//use bcrypt to compare  the provided  password  with the hashed password 


const isMatch = await bcrypt.compare(candidatePassword,this.password);
    return isMatch;





}catch(err)
{


    throw err;
}






}
//create Person Model

const Person = mongoose.model('Person',personSchema);
module.exports=Person;


  
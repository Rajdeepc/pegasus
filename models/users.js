const mongoose = require('mongoose');


/**
 * Creating the User Model
 */

 const User = mongoose.model('User', new mongoose.Schema({
     name:{
        type: String
     },
     age:{
        type: String
     },
     address:{
        type: String
     }
 }))


 exports.User = User;

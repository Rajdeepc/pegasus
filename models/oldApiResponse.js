const mongoose = require('mongoose');

/**
 * Creating the User Model
 */

 const SavedApiResponse = mongoose.model('SavedApiResponse', new mongoose.Schema({
     url:{
        type: String,
        required: true
     },
     savedResponses:{
        type: Array
     },
     subscribers: {
         type: Array,
         required: false
     },
     allNotifications:{
         type: Array
     }
 }, {collection: 'SavedApiResponse'}))


 exports.SavedApiResponse = SavedApiResponse;

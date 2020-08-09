const mongoose = require('mongoose');

/**
 * Creating the User Model
 */

 const SubscriberResponse = mongoose.model('SubscriberResponse', new mongoose.Schema({
     subscriber:{
        type: String,
        required: true
     },
     isActive:{
        type: Boolean
     }
 }, {collection: 'SubscriberResponse'}))


 exports.SubscriberResponse = SubscriberResponse;

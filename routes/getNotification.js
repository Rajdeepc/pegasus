const { SavedApiResponse } = require("../models/oldApiResponse");
const express = require('express');
const router = express.Router();

let isSubscribed = false;

router.post('/', async (req,res) => {
    const items = await SavedApiResponse.find({ url: req.body.url });

    const subscribers = items && items.length && items[0].subscribers
    console.log(subscribers)

    // check whether the requested user has subscribed to notification or not
    if(items && subscribers.length > 0){
        for(let i = 0; i < subscribers.length; i++){
            if((subscribers[i].subscriber === req.body.email) && subscribers[i].isActive){
                isSubscribed = true;
                break;
            }
        }
    }
    console.log('isSubscribed' + isSubscribed);
    // if the user has subscriber he gets the notifications
    if(isSubscribed){
        res.status(200).json({allNotifications: items[0].allNotifications})
    }
})

module.exports = router;
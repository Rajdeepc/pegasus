const { User } = require('../models/users');
const express = require('express');
const router = express.Router();


router.get('/', async (req,res) => {
    const items = await User.find({ })
   //(items)
    if(items){
        res.status(200).json(items)
    }

})

module.exports = router;
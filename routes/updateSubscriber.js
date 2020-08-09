const { SavedApiResponse } = require("../models/oldApiResponse");
const { SubscriberResponse } = require("../models/subscriber");
const express = require("express");
const router = express.Router();

// todo check if the user is present in subscriber list
// if is active true update with value and vice versa
// send the updated object only with active true or false

router.put("/", async (req, res) => {
  const fetchSavedSubscribers = await SavedApiResponse.find({
    url: req.body.url,
  });

  const subscribersList = fetchSavedSubscribers[0].subscribers;

  console.log(subscribersList);

  const subscriberObj = {
    subscriber: req.body.subscriber,
    isActive: req.body.isActive,
  };

  // if subscriber list has data
  if (subscribersList && subscribersList.length > 0) {
    for (let i = 0; i < subscribersList.length; i++) {
      if (subscribersList[i].subscriber === req.body.subscriber) {
        // if subscriber is present in the list proceed
        console.log("user present updating");
        SavedApiResponse.findOneAndUpdate(
          { url: req.body.url },
          { $set: { subscribers: subscriberObj } },
          { new: true },
          (err, items) => {
            if (err) {
              res.json(err);
            } else {
              res.status(200).send({ items, success: true });
            }
          }
        );
      } else {
        SavedApiResponse.findOneAndUpdate(
          { url: req.body.url },
          { $set: { subscribers: subscriberObj } },
          { new: true },
          (err, items) => {
            if (err) {
              res.json(err);
            } else {
              res
                .send(200)
                .json({ subscriberList: items, message: "New Items Added" });
            }
          }
        );
      }
    }
  } else {
    SavedApiResponse.findOneAndUpdate(
      { url: req.body.url },
      { $set: { subscribers: subscriberObj } },
      { new: true },
      (err, items) => {
        if (err) {
          res.json(err);
        } else {
          res
            .send(200)
            .json({ subscriberList: items, message: "New Items Added" });
        }
      }
    );
  }
});

module.exports = router;

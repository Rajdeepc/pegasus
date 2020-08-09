const { SavedApiResponse } = require("../models/oldApiResponse");
const express = require("express");
const router = express.Router();
const moment = require("moment");

const containsObject = (obj, list) => {
  let i;
  for (i = 0; i < list.length; i++) {
    if (JSON.stringify(list[i].response) === JSON.stringify(obj)) {
      console.log("already presnet");
      return true;
    }
  }
  console.log("not presnet");
  return false;
};

router.post("/", async (req, res) => {
  if (!req.body.url) {
    res.send(400).json({ error: "URL is mandatory" });
  }
  // go through data base and find if there is a document available for that url
  let fetchSavedResponse = await SavedApiResponse.find({ url: req.body.url });

  if (fetchSavedResponse && fetchSavedResponse.length > 0) {
    const isObjPresent = containsObject(
      req.body.response,
      fetchSavedResponse[0].savedResponses
    );

    if (isObjPresent === false) {
      const newUpdatedRespose = {
        createdAt: moment(new Date(new Date())).format("MM/DD/YYYY, h:mm:ss a"),
        response: req.body.response,
      };

      const latestNotification = {
        url: req.body.url,
        updatedAt: new Date(new Date()),
      };

      SavedApiResponse.findOneAndUpdate(
        { url: req.body.url },
        {
          $push: {
            savedResponses: {
              $each: [newUpdatedRespose],
              $position: 0,
            },
          },
        },
        { new: true },
        (err, items) => {
          if (err) {
            res.json(err);
          } else {
            SavedApiResponse.findOneAndUpdate(
              { url: req.body.url },
              {
                $push: {
                  allNotifications: {
                    $each: [latestNotification],
                    $position: 0,
                  },
                },
              },
              { new: true },
              (err, items) => {
                if (err) {
                  res.json(err);
                } else {
                  items.savedResponses.shift();
                  res
                    .status(200)
                    .json({ allSavedReponse: items, message: "New Response Added" });
                }
              }
            )
            
          }
        }
      );
    } else {
      fetchSavedResponse[0].savedResponses.shift();
      res
        .status(200)
        .json({
          allSavedReponse: fetchSavedResponse[0],
          message: "Nothing To add. Already Present",
        });
    }
  } else {
    saveAPI = new SavedApiResponse({
      url: req.body.url,
      savedResponses: req.body.response
        ? [
            {
              createdAt: moment(new Date(new Date())).format(
                "MM/DD/YYYY, h:mm:ss a"
              ),
              response: req.body.response,
            },
          ]
        : [],
      subscribers: [],
      allNotifications: [],
    });
    await saveAPI.save();
    res.status(200).send({ allResponse: saveAPI, message: "Item Saved" });
  }
});

module.exports = router;

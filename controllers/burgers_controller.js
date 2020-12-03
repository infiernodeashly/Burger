// Routes 
var express = require("express");

// Use router method off of express object to control routes in the application
var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");
// route to get landing page. 
router.get("/", function (req, res) {
  burger.selectAll(function (data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});
// route to post new burger
router.post("/burgers", function (req, res) {
  burger.insertOne([
    "burger_name"
  ], [
    req.body.burger_name
  ], function () {
    res.redirect("/");
  });
});


router.put("/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  // uses updated function to update the burger's status when the "devoured" button is clicked and move it from one list to the devoured list. 
  burger.updateOne({
    devoured: true
  }, condition, function (data) {
    res.redirect("/");

  });
});

// Export routes for server.js to use.
module.exports = router;

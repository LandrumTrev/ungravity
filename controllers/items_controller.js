// ITEMS_CONTROLLER.JS
// required as "routes" by server.js
// controls the results returned by calls on defined routes


// REQUIRE EXPRESS:
// ========================================================
// require the Express server to use its methods
var express = require("express");
// also require Express' Router to use Express Router methods
var router = express.Router();


// REQUIRE ITEM:
// ========================================================
// to access item.methods, which call orm.methods with specific args:
// allows orm.methods to be flexibly generic and reused by other models
var item = require("../models/item.js");


// DEFINE ROUTES:
// ========================================================

// GET route listens for calls on the home page (domain/index) route "/"
// and also defines a callback function(req, res)
// that tells Express server what to do with both incoming data (req), 
// and how to respond (res) to a call on that route
router.get("/", function (req, res) {

    // call the item.selectAll(cb) and pass in a function.
    // (data) in function(data) is returned by item.selectAll() as cb(res)
    // which is given to item.selectAll() by orm.selectAll() as cb(result)
    item.selectAll(function (data) {

        // create an object with "items" as key: name,
        // and rows returned: orm (result) > model (res) > route (data)
        // as the :value of the items: key in the hbsObject
        var hbsObject = {
            items: data
        };

        // console the hbsObject to see all data returned
        console.log(hbsObject);

        // then as the result (res) of router.get("/", ...),
        // .render index.handlebars and include the hbsObject returned data
        res.render("index", hbsObject);

    }); // end item.selectAll(cb) called by router.get()

}); // end router.get() controller for "/"


// ========================================================


// router.post("/api/items", function(req, res) {
//   item.create([
//     "name", "sleepy"
//   ], [
//     req.body.name, req.body.sleepy
//   ], function(result) {
//     // Send back the ID of the new quote
//     res.json({ id: result.insertId });
//   });
// });


// ========================================================


// router.put("/api/items/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   console.log("condition", condition);

//   item.update({
//     sleepy: req.body.sleepy
//   }, condition, function(result) {
//     if (result.changedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });


// ========================================================


// router.delete("/api/items/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   item.delete(condition, function(result) {
//     if (result.affectedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });


// ========================================================


// Export routes for server.js to use.
module.exports = router;
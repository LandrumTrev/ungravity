// ====================================================
// UnGravity :: A workout checklist web app
// MVC with MySQL, Node, Express, Handlebars and custom ORM.
// ©2018 Richard Trevillian
// University of Richmond (Virginia)
// Full Stack Developer Bootcamp (July 2018)
// ====================================================
// ITEM.JS - MODEL of MVC, calls ORM.js methods, required by items_controller.js routes
// ====================================================


// REQUIRE ORM:
// ========================================================
// orm.js contains defined generic database calls,
// which item.methods will use while passing in the "todo" table name
var orm = require("../config/orm.js");


// DEFINE ITEM.METHODS
// ========================================================
var item = {


    // item.selectAll(cb)
    // ========================================================
    // item.selectAll(cb) method takes in the (function(data) {}) callback
    // into (cb) when it is called in items_controller.js
    // so selectAll(cb) is a function that is passed a function
    // when it is called in items_controller.js by router.get("/", ...)
    selectAll: function (cb) {

        // item.selectAll(cb) calls the orm.selectAll() database call method,
        // by passing in the "todo" table name to orm.selectAll()
        // function(res) handles (res), the data returned by orm.selectAll
        orm.selectAll("todo", function (res) {

            // so what do we do with (res), the data returned by the ORM?
            // we pass it in as the argument of the callback function (cb)
            // which was passed into item.selectAll by router.get("/", ...)
            cb(res);

        });
    },


    // item.insertOne(cols, vals, cb)
    // ========================================================
    // called by router.post("/api/items", ...) in items_controller.js
    // router.post() passes in hard-coded (cols) names, object (vals) form values,
    // and a callback function (cb) to return the id as id: result.insertId
    insertOne: function (cols, vals, cb) {

        // calls orm.insertOne() and passes in a hard-coded "todo" table name,
        // as well as items_controller.js's hard-coded (cols) names (item, done),
        // and form values (item: "text of item", done: false),
        // and here defines a callback function
        // to handle the data returned from orm.insertOne()'s database query
        orm.insertOne("todo", cols, vals, function (res) {

            // callback simply passes data (res) returned by orm.insertOne
            // into router.post()'s callback function(result) as its (result)
            // where it is then passed as the (res) result of router.post() as:
            // res.json({ id: result.insertId });
            cb(res);

        });

    },


    // ========================================================


    // item.updateOne(objColVals, condition, cb)
    // ========================================================
    // called by router.put("/api/items/:id", ...) in items_controller.js
    // router.put grabs an id number passed at the end of a URL
    updateOne: function (objColVals, condition, cb) {
        // item.updateOne() calls orm.updateOne(), passing along its parameters,
        // and adding a hard-coded "todo" table name as first param passed to orm.updateOne
        orm.updateOne("todo", objColVals, condition, function (res) {
            // callback function just passes orm.updateOne()'s result data back to the route controller
            cb(res);
        });
    },

    // ========================================================

    // item.delete() called by items_controller.js 
    // for a DELETE request to /api/items/:id sent by todolist.js event handler
    // hard-codes the "todo" table name and calls orm.delete to update db
    // pass in (condition) from router.delete, such as "id = 12"
    // and also pass in router.delete()'s callback function as (cb)
    delete: function (condition, cb) {
        // call orm.delete(), pass in "todo" table name, condition, and callback
        // this callback takes the data returned from database by orm.delete (res),
        // and passes it back to router.delete()'s callback passed in as (cb)
        orm.delete("todo", condition, function (res) {
            // this passes (res) database returned data to router.delete()'s callback
            cb(res);
        });
    }
};

// Export the database functions for the controller (catsController.js).
module.exports = item;
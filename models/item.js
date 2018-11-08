// ITEM.JS
// required by items_controller (defines routes) required by server.js
// item.js methods call orm.js methods and pass in item's table name args


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


    updateOne: function (objColVals, condition, cb) {
        orm.updateOne("todo", objColVals, condition, function (res) {
            cb(res);
        });
    },

    // ========================================================


    //   delete: function(condition, cb) {
    //     orm.delete("todo", condition, function(res) {
    //       cb(res);
    //     });
    //   }
};

// Export the database functions for the controller (catsController.js).
module.exports = item;
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

    // The variables cols and vals are arrays.
    insertOne: function (cols, vals, cb) {
        orm.insertOne("todo", cols, vals, function (res) {
            cb(res);
        });
    },

    updateOne: function (objColVals, condition, cb) {
        orm.updateOne("todo", objColVals, condition, function (res) {
            cb(res);
        });
    },

    //   delete: function(condition, cb) {
    //     orm.delete("todo", condition, function(res) {
    //       cb(res);
    //     });
    //   }
};

// Export the database functions for the controller (catsController.js).
module.exports = item;
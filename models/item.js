// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var item = {
    selectAll: function (cb) {
        orm.selectAll("todo", function (res) {
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
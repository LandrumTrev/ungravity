// ORM.JS
// defines generic database calls to be used by item.js (etc.)
// which will then pass in their own specific arguments (table names)


// REQUIRE THE DATABASE CONNECTION
// ========================================================
// allows the orm.methods database access to make queries on it
var connection = require("../config/connection.js");


// ========================================================


// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";

// function printQuestionMarks(num) {
//   var arr = [];

//   for (var i = 0; i < num; i++) {
//     arr.push("?");
//   }

//   return arr.toString();
// }


// ========================================================


// // Helper function to convert object key/value pairs to SQL syntax
// function objToSql(ob) {
//   var arr = [];

//   // loop through the keys and push the key/value as a string int arr
//   for (var key in ob) {
//     var value = ob[key];
//     // check to skip hidden properties
//     if (Object.hasOwnProperty.call(ob, key)) {
//       // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
//       if (typeof value === "string" && value.indexOf(" ") >= 0) {
//         value = "'" + value + "'";
//       }
//       // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
//       // e.g. {sleepy: true} => ["sleepy=true"]
//       arr.push(key + "=" + value);
//     }
//   }

//   // translate array of strings to a single comma-separated string
//   return arr.toString();
// }


// ========================================================


// DEFINE ORM AND ITS METHODS 
// called by item.js methods to make item.js-specific queries to the database
// ========================================================

var orm = {

  // ========================================================

  // selectAll(table, cb) selects all table rows from a passed in table name
  // it accepts a table name (table) and a callback function (cb)
  selectAll: function (table, cb) {

    // define and construct the db query string using (table) table name
    var queryString = "SELECT * FROM " + table + ";";

    // connect to the database with the constructed queryString,
    // and then handle the returned data with function(err, result){}
    connection.query(queryString, function (err, result) {

      // if the database returns an error instead of expected data
      if (err) {
        throw err;
      }

      // if no (err), pass the (result) data that comes back from db into
      // the argument of the (cb) function passed into selectAll(table, cb)
      // by item.selectAll(cb) in item.js:
      // orm.selectAll("todo", function (res) {cb(res);});
      // so, (result) gets passed in as (res) to item.selectAll()'s callback,
      // which it then passes back to router.get("/") as it's function(res)
      cb(result);


    }); // end connection.query()

  }, // end selectAll(table,cb)

  // ========================================================

  // creates a new item in a table
  // pass in table name, columns, values, cb?
  insertOne: function (table, cols, vals, cb) {

    // initialize a queryString value with the table name...
    var queryString = "INSERT INTO " + table;

    // build a queryString to pass into the db call
    queryString += " (";
    // make the cols data (an array?) into a String
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    // insert the number of question marks equal to number of values passed in
    // using the printQuestionMarks helper function above
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    // log the queryString to check it
    console.log(queryString);

    // make db connection and pass it the queryString and column field values of item to add
    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

  // update an existing table row item
  // pass in the table name and an object of key:value pairs
  // the key:value pairs are converted to column name : field value
  // An example of objColVals would be {name: panther, sleepy: true}
  updateOne: function (table, objColVals, condition, cb) {

    // initialize a queryString value with the table name...
    var queryString = "UPDATE " + table;

    // add SET to indicate setting a column field value
    queryString += " SET ";
    // use objToSql helper function to convert an object with key:value pairs
    // into an array like ["key='value'", "key='value'", ...]
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    // and add the WHERE condition to indicate which row to update
    queryString += condition;

    // log the queryString to check it
    console.log(queryString);

    // make the database connection and pass in the queryString
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },


  //   delete: function(table, condition, cb) {
  //     var queryString = "DELETE FROM " + table;
  //     queryString += " WHERE ";
  //     queryString += condition;

  //     connection.query(queryString, function(err, result) {
  //       if (err) {
  //         throw err;
  //       }

  //       cb(result);
  //     });
  //   }


}; // end orm

// Export the orm object for the model (cat.js).
module.exports = orm;
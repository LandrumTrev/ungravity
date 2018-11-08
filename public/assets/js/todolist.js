  // EVENT HANDLER FOR submit BUTTON
  $(".create-form").on("submit", function (event) {

      // Make sure to preventDefault on a submit event.
      event.preventDefault();

      var newItem = {
          // put form input id="new-item" trimmed value into an object variable
          item: $("#new-item").val().trim(),
          // set the item's "done" value as "false" by default
          done: false
      };

      // POST request to router.post("/api/items", ...) in items_controller.js
      $.ajax("/api/items",
              // and send POST body JSON with data: value as the newItem object
              {
                  type: "POST",
                  data: newItem
              })

          // .then, when POST responds by sending (res),
          .then(function () {

              // confirm creation of new item
              console.log("created new to-do item");

              // and reload the page so selectAll() can display updated list
              location.reload();

          }); // end .then promise handler function

  }); // end .on("submit") event handler
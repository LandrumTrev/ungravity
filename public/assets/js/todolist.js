  // put link for this script at the BOTTOM of main.handlebars page,
  // so event handler scripts load AFTER elements they handle have been rendered

  // start jQuery wrapper function
  $(function () {

      // ========================================================

      // EVENT HANDLER FOR .change-status BUTTON
      $(".change-status").on("click", function (event) {

          // variable for the data-id="" property of THIS button
          var id = $(this).data("id");

          // variable for the data-newstatus="" property of THIS button
          var newStatus = $(this).data("newstatus");

          var newStatusState = {
              done: newStatus
          };

          // Send the PUT request.
          $.ajax("/api/items/" + id, {
              type: "PUT",
              data: newStatusState
          }).then(
              function () {
                  console.log("changed status to", newStatus);
                  // Reload the page to get the updated list
                  location.reload();
              }
          );
      });


      // ========================================================

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


      // ========================================================


      // EVENT HANDLER FOR .delete-cat BUTTON
      $(".delete-cat").on("click", function (event) {
        var id = $(this).data("id");

        // Send the DELETE request.
        $.ajax("/api/cats/" + id, {
          type: "DELETE"
        }).then(
          function () {
            console.log("deleted cat", id);
            // Reload the page to get the updated list
            location.reload();
          }
        );
      });

  }); // end jQuery wrapper function
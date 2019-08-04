$(function () {
    $(".create-form").on("submit", function (e) {
        e.preventDefault();

        var newBurger = {
            burger_name: $("#addBurger")
                .val()
                .trim(),
            devoured: 0
        };
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function () {
            console.log("Added New Burger!");
            // location.reload();
        });
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
          }).then(function() {
            console.log("Added new burger");
            location.reload();
          });
    });
});
$(function () {
    $(".create-form").on("submit", function (e) {
        e.preventDefault();

        var newBurger = {
            burger_name: $("#sBurger")
                .val()
                .trim(),
            devoured: 0
        };
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function () {
            console.log("Added new burger");
            location.reload();
        });
    });

    $(".btnEatBurger").on("click", function (e) {
        e.preventDefault();

        var id = $(this).data("id");
        var devouredState = {
            devoured: 1
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: devouredState
        }).then(function () {
            location.reload();
        });
    });
});
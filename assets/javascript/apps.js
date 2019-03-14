cartoons = ["Hey Arnold", "The Powerpuff Girls", "Dexter's Lab", "Spongebob", "Adventure Time", "The Simposns", "Dragonball Z", "Avatar the Last Airbender", "Daria"];

// (document).ready() {

function renderButtons() {
    $("#buttons-view").empty();
    for(var i = 0; i < cartoons.length; i++) {
      console.log(i, cartoons[i]);
      var button = $("<button>").text(cartoons[i]).attr("class", "cartoon").attr("data-name", cartoons[i]);
      console.log(button.data("name"));
      $("#buttons-view").append(button);
    }
    
};

$(document).on("click", ".cartoon", function() {
  var cartoon = $(this).attr("data-name")

  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=NqJe2RhCf7IMEmrqUqlPhSrhU9zoW5Kc&q="
      + cartoon + "&limit=9&offset=0&lang=en";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;
    console.log(response);

    for (var i = 0; i < results.length; i++) {
      if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
        var gifDiv = $("<div>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var cartoonImage = $("<img>");
        cartoonImage.attr("src", results[i].images.fixed_height_still.url)
                    .attr("data-animate", results[i].images.fixed_height.url)
                    .attr("data-still", results[i].images.fixed_height_still.url)
                    .attr("data-state", "still").attr("class", "gif");
        gifDiv.append(p);
        gifDiv.append(cartoonImage);
        $("#gifs-appear-here").prepend(gifDiv);
      };

    };



  });

});

$("#add-cartoon").on("click", function(event) {
  event.preventDefault();
  var cartoon = $("#cartoon-input").val().trim();
  cartoons.push(cartoon); 
  renderButtons();
});

$(document).on("click", ".gif", function() {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  console.log("State" + state);
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

renderButtons();

// };
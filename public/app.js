// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p>" + data[i].title + "<br /><a href='" + data[i].link + "'>" + data[i].link + "</a></p><button type='submit' data-id='" + data[i]._id + "'class='btn btn-default' id='saveArticle'>Save Article</button>");
  }
});

// Whenever someone clicks a p tag


//$(document).on("click", "p", function() {
$(document).on("click", "#saveArticle", function() {
 var currentURL = window.location.origin;
     //  //AJAX posts the data to friends API.
     // $.post(currentURL + "/api/friends", newFriend, function(data) {
     //            //Grab the result from the AJAX post so that the best match's name and photo are displayed.
     //            $("#bestMatch").text(data.name);
     //            $("#bestPic").attr("src", data.photo);
     //        });
            

  var modal = document.getElementById('myModal');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal 
    
        modal.style.display = "block";
   

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

  // Empty the notes from the note section
  //$("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");
  console.log("p id: ",thisId);
  
  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId

  })
  // With that done, add the note information to the page
    .done(function(data) {
      
      console.log(data);
      
      // The title of the article
      $(".modal-content").append("<h3>" + data.title + "</h3>");

      // An input to enter a new title
     // $(".modal-content").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $(".modal-content").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $(".modal-content").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $(".modal-content").val(data.note.title);
        // Place the body of the note in the body textarea
        $(".modal-content").val(data.note.body);
      }
    });
});


// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

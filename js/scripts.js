
// business logic for tickets
function Ticket (movie, age, time){
  this.movie = movie,
  this.theirAge = age,
  this.time = time,
  this.movieList = ["Christmas Story", "Home Alone", "Adult Feature", "Wreck Ralph 2", "Venom"];
}

Ticket.prototype.ageGate = function (){
  var age = parseInt(this.theirAge);
  var wantToWatch = this.movie;
  // for (i = 0; i < movies.lenth; i ++) {
    if (age < 16 && wantToWatch === "Adult Feature" || age < 16 && wantToWatch === "Venom"){
      return false;
    } else {
      return true;
    }
  // }
}

Ticket.prototype.matinee = function () {
  var matiTime = parseInt(this.time[0].concat(this.time[1]));
  if (matiTime < 16) {
    return true;
  } else {
    return false;
  }
}

Ticket.prototype.findPrice = function() {
  var age = this.theirAge;
  var price = 14.99;

  var newRelease = ["Wreck Ralph 2", "Venom"];

  if(!this.ageGate()) {
    return "unavailable";
  } else {
    if (age > 64) {
      price -= 5;

    } else if (age < 13) {
      price -= 5;

    }
    if (this.matinee()) {
      price -= 3;

    }
    for (var movie = 0; movie < newRelease.length; movie++) {
      if  (this.movie === newRelease[movie]) {
        price += 5;

      }
    }
    price = Math.floor(price * 100)/100 ;
    return price;

  }
}
//- - - - - - - - - - - - - - - - - - UI logic - - - - - - - - - - - - - - - - -

function displayTicket(ticketToDisplay){
  var title = ticketToDisplay.movie;
  var showing = ticketToDisplay.time;
  var finalPrice = ticketToDisplay.findPrice();

  $("#ticket-movie-title").text(title);
  $("#ticket-showtime").text(showing);
  $("#ticket-price").text(finalPrice);
  $(".results").show();
}

$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault();
    var inputTime = $("#theDate").val();
    // console.log(time);
    var inputMovie = $("#movieTitle").val();
    var inputAge = $("#inputAge").val();

    var userTicket = new Ticket(inputMovie, inputAge, inputTime);

    displayTicket(userTicket);
  });
});

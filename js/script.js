
"use strict";
$(function () {


var score = 0;
var demerits = 0;
var rate = 2500;
var poof = new Audio("poof.wav");
var prevHighScore;

var angleFinder = function(origin, target){
  var diff = origin-target; //should be negative if origin < target
  var height = 900; //height of container div
  var hyp = Math.sqrt(Math.pow(height,2) + Math.pow(diff,2));
  var angleRads = Math.atan(diff/hyp);
  return (angleRads * 180 / Math.PI);
};

var cookieDough = function(hiScore){ //sets cookie
  document.cookie = hiScore;
}

var cookieJar = function(){ //gets cookie
  var chocoChips = document.cookie;
  if (chocoChips){
    $(".hiscore").html("<h1>Previous Score: " + chocoChips + "</h1>");
  } else{
    $(".hiscore").html("<h1>Previous Score: 0</h1>");
  }
}

cookieJar();

	var dropMaker = function(){
		var drop = $("<div class ='raindrop'></div>");
		var target = Math.floor(Math.random() * $(window).width());
		var origin = Math.floor(Math.random() * $(window).width());
    
    console.log("origin: " + origin + " target: " + target + " diff: " + (origin-target) + " angle: " + angleFinder(origin, target));

    drop.css({
      "top" : -100,
      "left" : origin,
      "transform" : "rotate(" + angleFinder(origin,target) + "deg)",
    })

		$(".game").append(drop);

	    setTimeout(function() {
      drop.css("top", "99%");
      drop.css("left", target);
    }, 1000);

    drop.click(function(){
      drop.toggleClass("clicked");
      score++;
      poof.play(); //sound FX
      $(".evap").html("<h1>Drops Evaporated: " + score+ "</h1>");
      setTimeout(function(){
        drop.remove();
      },300)
	});

    setTimeout(function(){ //removes drop from DOM when they hit the bottom of page
      if (!drop.hasClass("clicked")){
      drop.remove();
      cookieDough(score); //sets cookie
      alert("Game Over");
      location.reload();

    }
    },5500);
  } //end dropmaker fxn

$(".start").click(function(){
    $(".container").toggleClass("dim");
    $(".start").remove();
    var decreasingInterval = function(){
        clearInterval(interval);
        if (rate > 500) {rate -= 50};
        console.log(rate);
        dropMaker();
        interval = setInterval(decreasingInterval, rate);
    }
    var interval = setInterval(decreasingInterval, rate);
});




});

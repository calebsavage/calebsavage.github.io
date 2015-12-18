
"use strict";
$(function () {
console.log("wanna piece o me");

var score = 0;
var demerits = 0;
var rate = 2500;

var angleFinder = function(origin, target){
  var diff = origin-target; //should be negative if origin < targer
  var height = 900;
  var hyp = Math.sqrt(Math.pow(height,2) + Math.pow(diff,2));

  // var formulaNum = Math.pow(height,2) + hyp - diff; //numerator of arcCos fxn
  // var formulaDenom = 2 * height * hyp;

  // var angleRads = (Math.acos(formulaNum / formulaDenom));
  // var radFactor = 180 / Math.PI;
  // return (angleRads * radFactor);
  var angleRads = Math.atan(diff/hyp);
  return (angleRads * 180 / Math.PI);
};

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
      $(".evap").html("<h1>Drops Evaporated: " + score+ "</h1>");
      setTimeout(function(){
        drop.remove();
      },300)
	});

    setTimeout(function(){
      if (!drop.hasClass("clicked")){
      drop.remove();
      demerits++;
      $(".hits").html("<h1>Hits: " + demerits + "</h1>");
    }
    },6000);
  } //end dropmaker fxn


setInterval(function(){
dropMaker();
rate -=1;
console.log("rate got faster");
}, rate);	


});

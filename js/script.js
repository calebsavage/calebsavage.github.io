
"use strict";
(function () {
console.log("script.js loaded");
	var dropMaker = function(){
		var drop = $("<div class ='raindrop'></div>")
		$(".game").append(drop);

		drop.css("top", 30);
		drop.css("left", Math.floor(Math.random() * 1024));
	}
	
	debugger;
})
();

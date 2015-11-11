(function(){
		"use strict";

	var rankingMethods = require('../');
	var fs = require('fs');


	var my_teams_array = JSON.parse(fs.readFileSync('team_array.json', 'utf8'));
	var my_schedule_array = JSON.parse(fs.readFileSync('schedule.json', 'utf8'));

	//get the array of rankings. Each index of the ranking array will be equal to the index of the team array
	var ranking_results = rankingMethods.Run(my_teams_array, my_schedule_array);


	//loop through the team array and add the rating score
	for(var i=0;i<my_teams_array.length;i++){
		my_teams_array[i].rating = ranking_results[i][0];
		my_teams_array[i].rank = i+1;
	}

	//sort the array based off of ratings
	my_teams_array.sort(rankingMethods.RatingSort);

	console.log(my_teams_array);

})();
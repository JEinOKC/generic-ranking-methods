var sylvester 	= require('sylvester'),
  Matrix = sylvester.Matrix,
  Vector = sylvester.Vector;

// constructor
function RankingMethods () {};


RankingMethods.prototype.Run = function(teamArray, schedule){
	//initialize the matrices based on the sizes of our queries
	var myMatrices = rankingMethods.matrixTemplates(schedule.length, teamArray.length);

	//populate the matrices
	myMatrices = rankingMethods.populateMatrices(myMatrices,teamArray,schedule);

	var results = null;
	try{
		results = rankingMethods.matrixMagic(myMatrices).elements;					
	}
	catch(err){
		throw "could not run the ranking process";
	}

	return results;
};

	

RankingMethods.prototype.matrixMagic = function(myMatrices){
	
	var matrix_X = myMatrices.gameMatrix;//an nxn matrix of games played
	var matrix_Y = myMatrices.diffMatrix;//an nx1 matrix of game results
	var matrix_xTrans = matrix_X.transpose();
	var xTx = matrix_xTrans.x(matrix_X);
	var xTy = matrix_xTrans.x(matrix_Y);


	var xTx_array = xTx.elements;
	var xTy_array = xTy.elements;

	for(i=0;i<xTx_array[xTx_array.length-1].length;i++)
		xTx_array[xTx_array.length-1][i] = 1;

	xTx = Matrix.create(xTx_array);

	for(i=0;i<xTy_array[xTy_array.length-1].length;i++)
		xTy_array[xTy_array.length-1][i] = 0;

	xTy = Matrix.create(xTy_array);
	
	var xTx_Inverse = xTx.inv();
	if(xTx_Inverse !== null){
		// console.log('inverse was created. Things going well..');
		return xTx_Inverse.x(xTy);	
	}
	

	// console.log("matrix is singular. Cannot create a ranking");

	throw "matrix is singular. Cannot create a ranking";
	// return null;
};


RankingMethods.prototype.matrixTemplates = function(gameCount, teamCount){
	
	/*The Java we are emulating:
		double[][] gameMatrix = new double[GameArray.size()][TeamArray.size()];
        double[][] diffMatrix = new double[GameArray.size()][1];
	*/

	myMatrices = {
		'gameMatrixArray' : rankingMethods.create2Darray(gameCount, teamCount),
		'diffMatrixArray' : rankingMethods.create2Darray(gameCount, 1)
	};

	return myMatrices;

};

RankingMethods.prototype.populateMatrices = function(myMatrices,TeamArray,scheduleArray){
	

	/*

		the schedule array must contain an array of games

		The Game object must contain:
		{
			'home_team_code': ...,
			'opponent_code': ...
			'ptDiff' : 0, //difference between winner or loser. could be exact score, adjusted score, percentage, etc
			'homeRep' : -1|1,//-1 indicates a loss
			'awayRep' : 1|-1//1 indicates a win
		}

		a minimal game object can be found using the minimalGameObject method
	*/

	for(i=0;i<scheduleArray.length;i++){
		var Game = scheduleArray[i].calcs;


		for(j=0;j<TeamArray.length;j++){
			var tmpTeam = TeamArray[j];
			if(tmpTeam['team_id'] == Game.home_team_code){
				// console.log("MATCH!!");
				myMatrices.gameMatrixArray[i][j] = Game.homeRep;
			}
			else if (tmpTeam['team_id'] == Game.opponent_code){
				// console.log("MATCH!!");
				myMatrices.gameMatrixArray[i][j] = Game.awayRep;
			}	
			else
				myMatrices.gameMatrixArray[i][j] = 0;
		}

		myMatrices.diffMatrixArray[i][0] = Game.ptDiff;

	}

	myMatrices.gameMatrix = Matrix.create(myMatrices.gameMatrixArray);
	myMatrices.diffMatrix = Matrix.create(myMatrices.diffMatrixArray);

	return myMatrices;
};

RankingMethods.prototype.minimalGameObject = function(){
	return {
		'home_team_code': 'TEAM1',
		'opponent_code': 'TEAM2',
		'ptDiff' : 0, //difference between winner or loser. could be exact score, adjusted score, percentage, etc
		'homeRep' : -1,//-1 indicates a loss
		'awayRep' : 1//1 indicates a win
	};
}

RankingMethods.prototype.create2Darray = function(x,y) {
    var arr = new Array(x);

    for(i=0;i<x;i++){
    	arr[i] = new Array(y);
    	for(j=0;j<y;j++){
    		arr[i][j]=0;
    	}
    }

    
    return arr;
}

RankingMethods.prototype.RatingSort = function(a,b){
	return b.rating-a.rating;
};


var rankingMethods = module.exports = exports = new RankingMethods;

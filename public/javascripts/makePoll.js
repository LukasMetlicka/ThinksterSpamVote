var app;
app = angular.module('makePoll', ["ui.router"]);

	app.controller("makePollController", ["$scope", "newPoll", function($scope, newPoll){
	
	$scope.newPoll = {titleText: "your title here!", redButtonText: "Red Option", blueButtonText: "Blue Option"};
		
	 
	$scope.createNewPoll = function(){
	 newPoll.newPoll = $scope.newPoll;
	};
	
}]);
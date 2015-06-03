var app = angular.module('poll', ["ui.router"]);

app.controller('pollController',[
	'$scope',"polls","$stateParams",
	function($scope, polls, $stateParams){

        $scope.poll = polls[$stateParams.id];

        $scope.addRedVotes = function(){
            polls[$stateParams.id].redVotes++;
        };
        $scope.addBlueVotes = function(){
            polls[$stateParams.id].blueVotes++;
        };
		

		
	}]);
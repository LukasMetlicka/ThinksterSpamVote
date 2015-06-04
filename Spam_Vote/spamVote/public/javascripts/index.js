var app = angular.module("showPolls", ["ui.router"]);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){
		
		$stateProvider
			.state("showPolls", {
				url: "/showPolls",
				templateUrl: "/showPolls.html",
				controller: "showPollController"
			});
		$stateProvider
			.state("poll", {
				url: "/poll/{id}",
				templateUrl: "poll.html",
                controller: "pollController"
			})
			$urlRouterProvider.otherwise("showPolls");
		
    }]);

app.factory("polls", [function() {
    var o = [

        {title: "Mac vs. PC", redVotes: 10, blueVotes: 15},
        {title: "Linux vs. PC", redVotes: 11, blueVotes: 14},
        {title: "Peter vs. Max", redVotes: 9, blueVotes: 16},
        {title: "iPad vs. iPhone", redVotes: 34, blueVotes: 6},
        {title: "Gus vs. Cole", redVotes: 7, blueVotes: 7}

    ];

    return o;
}])

app.controller("showPollController", ["$scope", "polls", "$stateParams",
	function($scope, polls, $stateParams){

        $scope.poll = polls[$stateParams.id];
        $scope.AllPolls = polls;

        $scope.openNewPollPage = function(){
            $scope.makeNew = true;
        }

        $scope.closeNewPollPage = function () {
            $scope.makeNew = false;
            console.log("ran!");
        }

    }]);

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

app.controller("makePollController", ["$scope", function($scope){

    $scope.makeNewPoll = function(){
        $scope.makeNew = false;
    };



}]);
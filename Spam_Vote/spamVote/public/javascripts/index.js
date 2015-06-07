var app = angular.module("showPolls", ["ui.router"]);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){
		
		$stateProvider
			.state("showPolls", {
				url: "/showPolls",
				templateUrl: "/showPolls.html",
				controller: "showPollController",
                resolve: {
                    pollPromise: ['polls', function(polls){
                        return polls.getAll();
                    }]
                }
			});
		$stateProvider
			.state("poll", {
				url: "/poll/{id}",
				templateUrl: "poll.html",
                controller: "pollController"
			})
			$urlRouterProvider.otherwise("showPolls");
		
    }]);

app.factory("polls", ['$http',function($http) {
    var o = [];
    o.getAll = function(){
        return $http.get('/showPolls').success(function(data){
            angular.copy(data, o);
        });
    };
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
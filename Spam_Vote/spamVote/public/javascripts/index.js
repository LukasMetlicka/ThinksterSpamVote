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
                controller: "pollController",
                resolve: {
                    poll: ['$stateParams', 'polls', function($stateParams, polls){
                        return polls.get($stateParams.id);
                    }]
                }
			});
			$urlRouterProvider.otherwise("showPolls");
		
    }]);

app.factory("polls", ['$http',function($http) {
    var o = [];
    o.getAll = function(){
        return $http.get('/showPolls').success(function(data){
            angular.copy(data, o);
        });
    };

    o.get = function(id){
      return $http.get('/poll/' + id).then(function(res){
          return res.data;
      })
    };

    o.create = function(poll){
        return $http.post('/showPolls', poll).success(function(data){
            o.push(data);
        })
    };

    o.redUpvote = function(poll, pollID){
        return $http.put('/poll/' + pollID + '/redUpvote',poll)
            .success(function(data){
                poll.redVotes += 1;
            });
    };

    o.blueUpvote = function(poll, pollID){
        return $http.put('/poll/' + pollID + '/blueUpvote',poll)
            .success(function(data){
                poll.blueVotes += 1;
            });
    };

    return o;
}]);

app.controller("showPollController", ["$scope", "polls", "$stateParams",
	function($scope, polls, $stateParams){

        $scope.poll = polls[$stateParams.id];
        $scope.AllPolls = polls;



        $scope.openNewPollPage = function(){
            $scope.makeNew = true;
        };

        $scope.closeNewPollPage = function () {
            $scope.makeNew = false;
        };
        $scope.makeNewPoll = function(){
            polls.create({
                title: $scope.title
            });
            $scope.makeNew = false;
        };


    }]);

app.controller('pollController',[
    '$scope',"polls","$stateParams", "poll",
    function($scope, polls, $stateParams, poll){

        $scope.poll = poll;
        var pollID = poll._id;

        $scope.addRedVotes = function(){
            polls.redUpvote(poll, pollID);
        };
        $scope.addBlueVotes = function(){
            polls.blueUpvote(poll, pollID)
        };


    }]);

/*app.controller("makePollController", ["$scope","polls", function($scope, polls){

    $scope.makeNewPoll = function(){
        polls.create({
            title: $scope.title
        });
        $scope.makeNew = false;
    };



}]); */
'use strict';

angular.module('myApp.view1', ['ngRoute','ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','$log', '$interval','$http','canvasService',

	function($scope, $log, $interval,$http,canvasService) {

		   $scope.X = 10;
           $scope.Y = 100;


          var coordinates = $interval(function() {
          	var canvas = document.getElementById("myCanvas");
	        var ctx = canvas.getContext("2d");
	        ctx.transform(1, 0, 0, -1, 0, canvas.height)
	        ctx.moveTo(-10,-10);
	        ctx.moveTo(200,100);

          	var promise = canvasService.getCoordinates(100);
            promise.then(
            function(payload) { 
                console.log(JSON.stringify(payload.data));
                $scope.X = payload.data.X;
                $scope.Y = payload.data.Y;
                },
            function(errorPayload) {
              $log.error('failure loading user', errorPayload);
            });



	        ctx.fillRect($scope.X,$scope.Y,5,5);

          }, 5000);

}])

.factory('canvasService', function($http) {
    return {
      getCoordinates: function(id) {
         return $http.get('https://test-gse00012255.apaas.us6.oraclecloud.com/person/' + id);
      }
    }
  });
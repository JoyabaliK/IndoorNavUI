'use strict';

angular.module('myApp.view2',['ngRoute','ui.bootstrap'])

.config(['$routeProvider','$httpProvider', function($routeProvider,$httpProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });

  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
}])

.controller('View2Ctrl', ['$scope', '$uibModal', '$log','$http','userService',

	function($scope, $uibModal, $log, $http,userService) {
        $scope.status;
        $scope.showForm = function (id) {
            var promise = userService.getEmployee(id);
            promise.then(
            function(payload) { 
                console.log(JSON.stringify(payload.data));
                $scope.user = payload.data;
                },
            function(errorPayload) {
              $log.error('failure loading user', errorPayload);
            });

            var modalInstance = $uibModal.open({
                templateUrl: 'components/modal-form.html',
                controller: ModalInstanceCtrl,
                scope: $scope,
                resolve: {
                    userForm: function () {
                        return $scope.userForm;
                    },
                     user: function () {
                        return $scope.user;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

}])

 .factory('userService', function($http) {
    return {
      getEmployee: function(id) {
         return $http.get('https://test-gse00012255.apaas.us6.oraclecloud.com/person/' + id);
      },

      updateEmployee: function(user){
        user.photo = 'null';
        var data = {data:user};
        console.log(JSON.stringify(data));
        return $http.put('https://test-gse00012255.apaas.us6.oraclecloud.com/person/' + user.id, data);
      }

    }
  });

var ModalInstanceCtrl = function ($scope, $uibModalInstance, userForm, user, userService) {
    $scope.submitForm = function () {
        if ($scope.form.userForm.$valid) {
            
            var promise = userService.updateEmployee($scope.user);
            promise.then(
            function(payload) { 
                $scope.status = 'Updated Customer! Refreshing customer list.';
                },
            function(errorPayload) {
                $scope.status = 'Unable to update customer: ' + errorPayload.message;
            });
            
            $uibModalInstance.close('closed');
        } else {
            console.log('form is not in scope');
        }
    };

    $scope.cancel = function () {
    	$scope.user = {};
        $uibModalInstance.dismiss('cancel');
    };
};
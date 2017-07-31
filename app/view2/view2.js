'use strict';

angular.module('myApp.view2', ['ngRoute','ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$uibModal', '$log',


	function($scope, $uibModal, $log) {
        $scope.showForm = function () {
            $scope.message = "Show Form Button Clicked";
            console.log($scope.message);
	    	
            $scope.user = {
	    	id:'1',
        	name: 'Bob',
        	description: 'I am awesome'
    		};

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

}]);

var ModalInstanceCtrl = function ($scope, $uibModalInstance, userForm, user) {
    $scope.submitForm = function () {
        if ($scope.form.userForm.$valid) {
          console.log(JSON.stringify($scope.user.name));
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
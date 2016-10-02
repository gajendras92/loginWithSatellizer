angular.module('loginSignUpWithSatellizer')
    .directive('header',['toastr', function(toastr){
        return{
            restrict:'EA',
            templateUrl: 'modules/common/directives/header.html',
            controller:['$scope',function($scope){

            }]
        }
    }]);


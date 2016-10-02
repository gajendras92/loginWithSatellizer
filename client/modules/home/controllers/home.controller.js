angular.module('blessing')
    .controller('HomeCtrl',['$scope','$state', '$http',function($scope, $state, $http) {
    $scope.address = 'in home page';
    $scope.data = $state.current.data.first;

    $scope.submitName = function(data){

    $http.post('/api/v1/home', {data:data}).then(function(response){


    });

    }

}]);



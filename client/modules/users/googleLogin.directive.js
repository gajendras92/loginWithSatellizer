angular.module('loginSignUpWithSatellizer')
    .directive('googleLogin',['$auth','toastr', function($auth,toastr){
        return{
            restrict:'EA',
            templateUrl: 'modules/users/googleLogin.html',
            controller:['$scope',function($scope, $state){
                $scope.authenticate = function(provider) {
                    $auth.authenticate(provider)
                        .then(function (response) {
                            console.log('response',response);
                            toastr.success('You have successfully signed in!');
                            $state.go('dashboard');
                        })
                        .catch(function (error) {
                            toastr.error(error.data.message, error.status);
                        });
                };
            }]
        }
    }]);


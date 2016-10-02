angular.module('loginSignUpWithSatellizer')
    .directive('signup',['$auth','toastr', function($auth, toastr){
        return{
            restrict:'EA',
            templateUrl: 'modules/users/signup.html',
            controller:['$scope',function($scope){
                $scope.signup = function(user){
                    $auth.signup(user)
                        .then(function (response) {
                            console.log('response',response);
                            $auth.setToken(response);
                            toastr.info('You have successfully created a new account and have been signed-in');
                        })
                        .catch(function (response) {
                            toastr.error(response.data.message);
                        });


                }
            }]
        }
    }]);


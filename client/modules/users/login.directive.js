angular.module('loginSignUpWithSatellizer')
    .directive('login',['$UsersService','toastr','$auth','$state', function($UsersService,toastr,$auth,$state){
        return{
            restrict:'EA',
            templateUrl: 'modules/users/login.html',
            controller:['$scope',function($scope){
                $scope.login = function(object){
                    $UsersService.getUserByEmail(object.email, function (response) {
                        if (response.status == true) {
                            toastr.info('You are disbled');
                        } else {
                            $auth.login(object)
                                .then(function () {
                                    toastr.success('You have successfully signed in!');
                                    $scope.User = {};
                                    $state.go('dashboard');

                                })
                                .catch(function (error) {
                                    toastr.error(error.data.message, error.status);
                                });
                        }
                    })

                }
            }]
        }
    }]);


(function () {
    'use strict';

    function UsersService($resource, toastr, CONSTANT) {

        this.tempUser = null;

        return {

            getUserByEmail:function(email,callback){
                var addConnectionQuery = $resource(CONSTANT.HOST + 'getUserByEmail', {}, {
                    query: {
                        method: 'GET',
                        isArray:true
                    }
                });
                addConnectionQuery.query(email, function (response) {
                    callback(response);
                }, function (error) {
                    toastr.error(error.data.message, error.status);
                    return false;
                });
            }
        };

    }

    angular.module('loginSignUpWithSatellizer').factory('$UsersService',['$resource', 'toastr', 'CONSTANT', UsersService]);
})();
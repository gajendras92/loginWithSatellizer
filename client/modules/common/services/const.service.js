'use strict';

var obj = {};
if(window.location.hostname === 'localhost'){
    obj = {'HOST': 'http://localhost:3000/api/v1/'};
}else {
    obj = { 'HOST': 'http://localhost:3000/api/v1/'};
}
angular.module('loginSignUpWithSatellizer').constant('CONSTANT', obj);
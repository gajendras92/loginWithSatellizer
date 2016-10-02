angular.module('loginSignUpWithSatellizer',
    [
        "ui.router",
        'satellizer',
        "toastr",
        "ngResource"
    ])
    .config(function($authProvider, CONSTANT) {

        $authProvider.signupUrl = CONSTANT.HOST + 'auth/signup';
        $authProvider.loginUrl = CONSTANT.HOST + 'auth/signin';

        $authProvider.google({
            clientId: '900296747588-k8oj55e27hnubmbtgsf3en6bf2g1ikmm.apps.googleusercontent.com',
            url:  CONSTANT.HOST + 'auth/google'

        });
        $authProvider.loginRedirect = null;
        $authProvider.facebook({
            clientId: '1582563292051119',
            url:  CONSTANT.HOST + 'auth/facebook'
        });

    });

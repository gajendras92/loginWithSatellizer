angular.module('loginSignUpWithSatellizer')
    .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/login");
    $stateProvider
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "modules/dashboard/dashboard.html",
            controller: 'dashboardController'
        })
         .state('login', {
                url: "/login",
                template: "<login></login>"
            })

        .state('signup', {
            url: "/signup",
            template: "<signup></signup>"
        });

    /*
        .state('nested.secondPage', {
            url: "/secondPage",
            templateUrl: "../views/secondPage.html",
            controller: function($scope){
                $scope.value = "second page value";
            }

        })

        .state('demo', {
            url: "/demo",
            templateUrl: "../views/demo.html",
            controller: function($scope){
                $scope.items = ["A", "List", "Of", "Items"];
            }
        })
        .state('directiveDemo', {
            url: "/directiveDemo",
            template: "<directive-demo></directive-demo>"
        })*/

});







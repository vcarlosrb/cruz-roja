angular.module('cruzroja', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ngAnimate', 'infinite-scroll','akoenig.deckgrid']);

angular.module('cruzroja').config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    /*$locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });*/

    $stateProvider.state('app', {
        url: '/',
        abstract: true,
        views: {
            'footer': {
                templateUrl: 'http://cruzroja.hotpoint.la/partial/footer//footer.html'
                //templateUrl: '/partial/footer//footer.html'
            }
        }
    });

    $stateProvider.state('app.home', {
        url: '',
        parent: 'app',
        views: {
            '@': {
                templateUrl: 'http://cruzroja.hotpoint.la/partial/home//home.html'
                //templateUrl: '/partial/home//home.html'
            }
        }
    });

    $stateProvider.state('app.publish', {
        url: 'publish',
        parent: 'app',
        views: {
            '@': {
                templateUrl: 'http://cruzroja.hotpoint.la/partial/publish//publish.html'
                //templateUrl: '/partial/publish//publish.html'
            }
        }
    });

    /* Add New States Above */
    $urlRouterProvider.otherwise('/');


});

angular.module('cruzroja').run(function ($rootScope) {

    $rootScope.pathName = "http://cruzroja.hotpoint.la/cms/index.php/api";

    $rootScope.safeApply = function (fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});

angular.module('cruzroja').controller('MainCtrl', function ($scope, $state) {

    $scope.initial = {
        init: function() {
            this.getUser();
        },
        getUser: function() {
            if(localStorage.getItem('user')) {
                $scope.userData = JSON.parse(localStorage.getItem('user'));
                $state.go('app.publish');
            } else {
                $state.go('app.home');
            }
        }
    };
    $scope.initial.init();

    $scope.$on("getUser", function (e, d) {
        $scope.userData = d;
        localStorage.setItem('user', JSON.stringify(d));
    });

    $scope.userOptions = {
        logout: function() {
            localStorage.clear();
            $state.go("app.home");
        }
    }

});

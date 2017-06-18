angular.module('cruzroja').controller('HomeCtrl', function ($scope, $state, user, email, country) {
    $scope.setStyle = {
        init: function () {
            //this.setHeight();
            $('.wrapper').css('background-image','url("/assets/images/fondo.jpg")');
        },
        setHeight: function () {
            var height = $(window).height();
            $('.home').css('min-height', height + 'px');
            $(window).resize(function () {
                var height = $(window).height();
                $('.home').css('min-height', height + 'px');
            });
        }
    };
    $scope.setStyle.init();

    $scope.partHome = {
        init: function () {
            this.keySearch();
        },
        search: function (data) {
            if (data != null) {
                localStorage.setItem('hashtag', data);
                $state.go('app.publish');
            }
        },
        keySearch: function () {
            var self = this;
            $("#search").keypress(function (e) {
                if (e.keyCode == 13) {
                    self.search($scope.hashtag);
                }
            });
        }
    };
    $scope.partHome.init();

    $scope.select = false;
    $('body').on('click', function () {
        if ($scope.select) {
            $('.listItems').slideUp(200);
            $scope.select = false;
        }
    });
    $scope.transition = {
        showSignup: function () {
            $('.blockLog').fadeOut(200);
            setTimeout(function () {
                $('.blockSign').fadeIn(200)
            }, 250);
        },
        showLogin: function () {
            $('.blockSign').fadeOut(200);
            setTimeout(function () {
                $('.blockLog').fadeIn(200)
            }, 250);
        },
        showSelect: function () {
            $('.listItems').slideToggle(200);
            if ($scope.select) {
                $scope.select = false;
            } else {
                setTimeout(function () {
                    $scope.select = true;
                }, 100);
            }
        }
    };

    $scope.Country = {
        init: function () {
            this.getCountry();
        },
        getCountry: function () {
            country.getAll().then(function (res) {
                $scope.listCountry = res.paises;
            });
        },
        select: function(item) {
            $scope.currentCountry = item;
            $scope.userSign.pais = item.id;
        }
    };
    $scope.Country.init();

    $scope.loaderLogin = false;
    $scope.loaderSignup = false;
    $scope.userLog = {};
    $scope.userSign = {};
    $scope.User = {
        login: function (data) {
            $scope.validLogEmail = false;
            $scope.validLogPassword = false;
            if (data.email == undefined || data.email == null) {
                $scope.validLogEmail = true;
            } else {
                if (!email.validate(data.email)) $scope.validLogEmail = true;
                else $scope.validLogEmail = false;
            }
            if (data.password == undefined || data.password == null) {
                $scope.validLogPassword = true;
            } else {
                $scope.validLogPassword = false;
            }
            if (!$scope.validLogEmail && !$scope.validLogPassword) {
                $scope.loaderLogin = true;
                user.login(data).then(function (res) {
                    var parse = JSON.parse(res);
                    $scope.$emit("getUser", parse.data.usuario);
                    $state.go("app.publish");
                    $scope.loaderLogin = false;
                });
            }
        },
        signup: function (data) {
            $scope.validSignName = false;
            $scope.validSignLastName = false;
            $scope.validSignEmail = false;
            $scope.validSignPassword = false;
            $scope.validSignDni = false;
            $scope.validSignCountry = false;

            if (data.name == undefined || data.name == null) $scope.validSignName = true;
            else $scope.validSignName = false;

            if (data.lastName == undefined || data.lastName == null) $scope.validSignLastName = true;
            else $scope.validSignLastName = false;

            if (data.email == undefined || data.email == null) {
                $scope.validSignEmail = true;
            } else {
                if (!email.validate(data.email)) $scope.validSignEmail = true;
                else $scope.validSignEmail = false;
            }

            if (data.password == undefined || data.password == null) $scope.validSignPassword = true;
            else $scope.validSignPassword = false;

            if (data.dni == undefined || data.dni == null) $scope.validSignDni = true;
            else $scope.validSignDni = false;

            if ($scope.userSign.pais == undefined || $scope.userSign.pais == null) $scope.validSignCountry = true;
            else $scope.validSignCountry = false;

            if (!$scope.validSignName && !$scope.validSignLastName && !$scope.validSignEmail && !$scope.validSignPassword && !$scope.validSignDni && !$scope.validSignCountry) {
                $scope.loaderSignup = true;
                user.signup(data).then(function (res) {
                    var parse = JSON.parse(res);
                    $scope.$emit("getUser", parse.data.usuario);
                    $state.go("app.publish");
                    $scope.loaderSignup = false;
                });
            }
        }
    }

});

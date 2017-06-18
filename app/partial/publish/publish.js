angular.module('cruzroja').controller('PublishCtrl', function ($scope, twitter, hashtag, $state) {

    $scope.tweets = [];
    $scope.publish = [];
    $scope.hashtag = null;
    $scope.loader = false;
    $scope.page = 1;

    $scope.Twitter = {
        init: function () {
            twitter.initialize();
            this.login();
        },
        login: function () {
            var self = this;
            twitter.connectTwitter().then(function () {
                if (twitter.isReady()) {
                    //self.getTweets($scope.title);
                }
            });
        },
        signOut: function () {
            twitter.clearCache();
        },
        getTweets: function (hashtag) {
            $scope.loader = true;
            twitter.getLatestTweets(hashtag).then(function (data) {
                $scope.loader = false;
                $scope.tweets = data.statuses;
                $scope.nextTweets = data.search_metadata.next_results;
                $('.secondLoad').css('display', 'none');
                $('.publishList').css('display', 'block');
            }, function (err) {
                $scope.loader = false;
            });
        },
        sendMessage: function (user, message, event) {
            var data = {
                user_id: user.id,
                text: message
            };
            twitter.sendMessage(data).then(function (res) {
                $scope.message = "";
                $(event.currentTarget).parent().parent().parent().slideUp(200)
            }, function (err) {
                $(event.currentTarget).parent().parent().parent().slideUp(200)
            });
        },
        followUser: function (user, event) {
            var data = {

                user_id: user
            };
            twitter.followUser(data).then(function (res) {
                $(event.currentTarget).css({'background-color': 'rgba(233, 27, 37, 0.85)', 'color': 'white'});
            }, function (err) {
                console.log(err, 'err')
            });
        },
        updateStatuses: function (event) {
            $('.smContent .smcButton').fadeOut(200, function () {
                $('.smContent .loader').fadeIn(200);
            });
            var status = $(event.currentTarget).parent().parent().find('.getMessage').val();
            navigator.geolocation.getCurrentPosition(function (res) {
                var data = {
                    status: status,
                    lat: res.coords.latitude,
                    long: res.coords.longitude
                };
                twitter.updateStatuses(data).then(function (res) {
                    hashtag.sendAnswer().then(function (res) {
                        $('.smContent .loader').fadeOut(200, function () {
                            $('.smContent .smcButton').fadeIn(200);
                        });
                        $scope.totalAnswer = parseInt($scope.totalAnswer) + parseInt(1);
                        $(event.currentTarget).parent().parent().parent().slideUp(200)
                    });
                }, function (err) {
                    $('.smContent .loader').fadeOut(200, function () {
                        $('.smContent .smcButton').fadeIn(200);
                    });
                    $(event.currentTarget).parent().parent().parent().slideUp(200)
                });
            });
        }
    };


    $scope.TwitterService = {
        getTweets: function () {
            twitter.getTweetsService($scope.title, 0).then(function (res) {
                $scope.tweets = res.data;
                $scope.nextTweets = res.next;
                $('.secondLoad').css('display', 'none');
                $('.publishList').css('display', 'block');
            })
        }
    };


    $scope.partPublish = {
        init: function () {
            //$scope.TwitterService.getTweets();
            $scope.Twitter.init();
            this.keySearch();
        },
        search: function (data) {
            $scope.title = angular.copy(data);
            $scope.TwitterService.getTweets();
            this.showList();
            $('.secondLoad').css('display', 'block');
            $('.publishList').css('display', 'none');
        },
        keySearch: function () {
            var self = this;
            $("#search").keypress(function (e) {
                if (e.keyCode == 13) {
                    self.search($scope.hashtag);
                }
            });
        },
        nextResults: function () {
            if ($scope.nextTweets && !$scope.loader) {
                $scope.loader = true;
                twitter.getTweetsService($scope.title, $scope.nextTweets).then(function (res) {
                    $scope.loader = false;
                    res.data.forEach(function (obj) {
                        $scope.tweets.push(obj);
                    });
                    $scope.nextTweets = res.next;
                });
            }
        },
        showMessage: function (event) {
            $(event.currentTarget).parent().find(".showMessage").slideToggle(100);
        },
        showDashboard: function () {
            $('.publish').fadeOut(200);
            setTimeout(function () {
                $('.contAdmin').fadeIn(200);
            }, 250);
        },
        showList: function () {
            $('.contAdmin').fadeOut(200);
            setTimeout(function () {
                $('.publish').fadeIn(200);
            }, 250);
        }
    };

    $scope.dropdown = false;
    $('body').on('click', function () {
        if ($scope.dropdown) {
            $('.dropProfile').slideUp(200);
            $scope.dropdown = false;
        }
    });

    $scope.Toggle = {
        showDoropdown: function () {
            $('.dropProfile').slideToggle(200);
            if ($scope.dropdown) {
                $scope.dropdown = false;
            } else {
                setTimeout(function () {
                    $scope.dropdown = true;
                }, 100);
            }
        }
    };

    $scope.Password = {
        showDialog: function () {
            setTimeout(function () {
                $('.changePass').fadeIn(200);
            }, 200);
        },
        closeDialog: function () {
            $('.changePass').fadeOut(200);
        }
    };

    $scope.Dashboard = {
        init: function () {
            this.percentage();
            this.week();
            this.social();
            this.totalSend();
            this.lastTweets();
        },
        percentage: function () {
            hashtag.typePercentage().then(function (res) {
                $scope.listPercentage = res;
            });
        },
        week: function () {
            hashtag.currentWeek().then(function (res) {
                $scope.listWeek = res;
            });
        },
        social: function () {
            hashtag.socialPercentage().then(function (res) {
                $scope.listSocial = res;
            });
        },
        totalSend: function () {
            hashtag.totalAnswer().then(function (res) {
                $scope.totalAnswer = res;
            });
        },
        lastTweets: function () {
            hashtag.lastMedia().then(function (res) {
                $scope.listTweets = res;
            });
        },
        count: function () {
            hashtag.sendAnswer().then(function (res) {
                $scope.totalAnswer = parseInt($scope.totalAnswer) + parseInt(1);
            });
        }
    };

    $scope.validUser = {
        getUser: function () {
            if (!$scope.userData) {
                $state.go("app.home");
            } else {
                $scope.Dashboard.init();
                $scope.partPublish.init();
            }
        }
    };

    $scope.validUser.getUser();

});

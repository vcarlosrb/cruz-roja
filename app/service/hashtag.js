angular.module('cruzroja').factory('hashtag', function ($q, $rootScope) {

    var percentageData = null;
    var weekData = null;
    var socialData = null;
    var answerData = null;
    var tweetsData = null;

    var hashtag = {
        typePercentage: function () {
            var deferred = $q.defer();
            if (!percentageData) {
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": $rootScope.pathName + "/Hashtag/listarHastagPorcentage",
                    "method": "GET"
                };

                $.ajax(settings).done(function (response) {
                    response.data.forEach(function (obj) {
                        obj.porcentage = parseFloat(obj.porcentage).toFixed(1);
                    });
                    percentageData = response.data;
                    deferred.resolve(response.data);
                }).fail(function (err) {
                    deferred.reject(err);
                });
            } else {
                deferred.resolve(percentageData);
            }
            return deferred.promise;
        },
        currentWeek: function () {
            var deferred = $q.defer();
            if (!weekData) {
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": $rootScope.pathName + "/Hashtag/listarHashtag",
                    "method": "GET"
                };

                $.ajax(settings).done(function (response) {
                    var max = 0;
                    response.data.forEach(function (obj) {
                        if (obj.cantidad > max) {
                            max = obj.cantidad;
                        }
                    });
                    response.data.forEach(function (obj) {
                        obj.porcentage = obj.cantidad * 100 / max;
                    });
                    var json = {
                        max: max,
                        list: response.data
                    };
                    weekData = json;
                    deferred.resolve(json);
                }).fail(function (err) {
                    deferred.reject(err);
                });
            } else {
                deferred.resolve(weekData);
            }
            return deferred.promise;
        },
        socialPercentage: function () {
            var deferred = $q.defer();
            if (!socialData) {
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": $rootScope.pathName + "/Hashtag/listarTweetPorcentageSocial",
                    "method": "GET"
                };

                $.ajax(settings).done(function (response) {
                    response.data.forEach(function (obj) {
                        obj.porcentage = parseFloat(obj.porcentage).toFixed(1);
                        obj.num = parseFloat(obj.porcentage).toFixed(0);
                    });
                    socialData = response.data;
                    deferred.resolve(response.data);
                }).fail(function (err) {
                    deferred.reject(err);
                });
            } else {
                deferred.resolve(socialData);
            }
            return deferred.promise;
        },
        lastMedia: function () {
            var deferred = $q.defer();
            if (!tweetsData) {
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": $rootScope.pathName + "/Hashtag/listarUltimosTweets",
                    "method": "GET"
                };

                $.ajax(settings).done(function (response) {
                    tweetsData = response.data;
                    deferred.resolve(response.data);
                }).fail(function (err) {
                    deferred.reject(err);
                });
            } else {
                deferred.resolve(tweetsData);
            }
            return deferred.promise;
        },
        sendAnswer: function () {
            var deferred = $q.defer();
            var formData = new FormData();
            formData.append("send", 1);
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": $rootScope.pathName + "/Hashtag/contador",
                "processData": false,
                "contentType": false,
                "mimeType": "multipart/form-data",
                "method": "POST",
                data: formData
            };

            $.ajax(settings).done(function (response) {
                deferred.resolve(response);
            }).fail(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;

        },
        totalAnswer: function () {
            var deferred = $q.defer();
            if (!answerData) {
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": $rootScope.pathName + "/Hashtag/getTweetRespondidos",
                    "method": "GET"
                };

                $.ajax(settings).done(function (response) {
                    answerData = response.cantidad;
                    deferred.resolve(response.cantidad);
                }).fail(function (err) {
                    deferred.reject(err);
                });
            } else {
                deferred.resolve(answerData);
            }
            return deferred.promise;
        }
    };

    return hashtag;
});

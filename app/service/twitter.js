angular.module('cruzroja').factory('twitter', function ($q, $rootScope) {

    var authorizationResult = false;

    return {
        initialize: function () {
            authorizationResult = OAuth.create("twitter");
        },
        isReady: function () {
            return (authorizationResult);
        },
        connectTwitter: function () {
            var deferred = $q.defer();
            OAuth.popup("twitter", {
                cache: true
            }, function (error, result) {
                if (!error) {
                    authorizationResult = result;
                    deferred.resolve();
                } else {
                    //do something if there's an error
                }
            });
            return deferred.promise;
        },
        clearCache: function () {
            OAuth.clearCache('twitter');
            authorizationResult = false;
        },
        getLatestTweets: function (hashtag) {
            var deferred = $q.defer();
            var url = 'https://api.twitter.com/1.1/search/tweets.json?q=%23' + hashtag + '&lang=es&count=50&until=2015-05-01&result_type=mixed';
            var promise = authorizationResult.get(url).done(function (data) {
                deferred.resolve(data);
                console.log(data,'tweets')
            }).fail(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },
        getNextTweets: function (next) {
            var deferred = $q.defer();
            var url = 'https://api.twitter.com/1.1/search/tweets.json' + next;
            var promise = authorizationResult.get(url).done(function (data) {
                deferred.resolve(data);
            }).fail(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },
        sendMessage: function (data) {
            var deferred = $q.defer();
            var url = 'https://api.twitter.com/1.1/direct_messages/new.json';
            var promise = authorizationResult.post(url, {data: data}).done(function (data) {
                deferred.resolve(data);
            }).fail(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },
        followUser: function (data) {
            var deferred = $q.defer();
            var url = 'https://api.twitter.com/1.1/friendships/create.json';
            var promise = authorizationResult.post(url, {data: data}).done(function (data) {
                deferred.resolve(data);
            }).fail(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },
        updateStatuses: function (data) {
            var deferred = $q.defer();
            var url = 'https://api.twitter.com/1.1/statuses/update.json';
            var promise = authorizationResult.post(url, {data: data}).done(function (data) {
                deferred.resolve(data);
            }).fail(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },
        getTweetsService: function (hashtag, page) {
            var deferred = $q.defer();
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": $rootScope.pathName+"/hashtag/listar?tag="+hashtag+"&pag="+page,
                "method": "GET"
            };

            $.ajax(settings).done(function (response) {
                deferred.resolve(response);
            }).fail(function(err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }
});



angular.module('cruzroja').factory('instagram', function ($q) {

    var authorizationResult = false;
    var token = null;

    return {
        initialize: function () {
            authorizationResult = OAuth.create("instagram");
        },
        isReady: function () {
            return (authorizationResult);
        },
        connectInstagram: function () {
            var deferred = $q.defer();
            OAuth.popup("instagram", {
                cache: true
            }, function (error, result) {
                if (!error) {
                    console.log(result, 'result');
                    token = result.access_token;
                    authorizationResult = result;
                    deferred.resolve();
                } else {
                    //do something if there's an error
                }
            });
            return deferred.promise;
        },
        clearCache: function () {
            OAuth.clearCache('instagram');
            authorizationResult = false;
        },
        getLatestPublish: function (hashtag) {
            var deferred = $q.defer();
            var url = "https://api.instagram.com/v1/tags/" + hashtag + "/media/recent";
            var promise = authorizationResult.get(url).done(function (data) {
                console.log(data, 'instagrams');
                deferred.resolve(data);
            }).fail(function (err) {
                console.log(err, 'error');
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }


});
